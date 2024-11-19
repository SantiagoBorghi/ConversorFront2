import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CurrencyService } from "../../services/currency-service.service";
import { Currency } from "../../interfaces/currency";
import { AuthService } from "../../services/auth-service.service";

@Component({
	selector: "app-edit-currency",
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: "./edit-currency.component.html",
	styleUrls: ["./edit-currency.component.scss"],
})
export class EditCurrencyComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private currencyService = inject(CurrencyService);
	private auth = inject(AuthService);

	currencyId: number | null = null;
	currency: Currency | null = null;
	loading: boolean = false;
	error: string | null = null;

	editingField: string | null = null;
	saveStatus: { [key: string]: "success" | "error" | null } = {};

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			const id = params.get("id");
			this.currencyId = id ? +id : null;
			if (this.currencyId) {
				this.fetchCurrency(this.currencyId);
			} else {
				this.error = "ID de moneda inválido.";
			}
		});
	}

	fetchCurrency(id: number): void {
		this.loading = true;
		this.currencyService
			.getCurrencyById(id)
			.then((data) => {
				this.currency = data;
				this.loading = false;
				console.log(data);
			})
			.catch((err) => {
				this.error = "Error al obtener la moneda.";
				this.loading = false;
			});
	}

	saveChanges(): void {
		if (this.currency) {
			this.currencyService
				.updateCurrency(this.currency)
				.then(() => {
					this.router.navigate(["/currency-ic"]);
				})
				.catch((err) => {
					this.error = "Error al actualizar la moneda.";
				});
		}
	}

	cancel(): void {
		this.router.navigate(["/currency-ic"]);
	}

	logout(): void {
		this.auth.logout();
	}

	editField(fieldName: string): void {
		this.editingField = fieldName;
	}

	saveField(fieldName: string, value: any): void {
		if (value === null || value === undefined || value === "") {
			this.error = `El campo ${fieldName} no puede estar vacío.`;
			this.saveStatus[fieldName] = "error";
			setTimeout(() => {
				this.saveStatus[fieldName] = null;
			}, 3000);
			return;
		}
		if (value <= 0) {
			this.error = `El campo ${fieldName} no puede ser negativo ni 0.`;
			this.saveStatus[fieldName] = "error";
			setTimeout(() => {
				this.saveStatus[fieldName] = null;
			}, 3000);
			return;
		}
		if (this.currency) {
			(this.currency as any)[fieldName] = value;
			this.currencyService
				.updateCurrency(this.currency)
				.then(() => {
					this.editingField = null;
					this.saveStatus[fieldName] = "success";
					setTimeout(() => {
						this.saveStatus[fieldName] = null;
					}, 3000);
				})
				.catch((err) => {
					this.error = `Error al actualizar ${fieldName}.`;
					this.saveStatus[fieldName] = "error";
					setTimeout(() => {
						this.saveStatus[fieldName] = null;
					}, 3000);
				});
		}
	}

	cancelEdit(): void {
		this.editingField = null;
		this.saveStatus = {};
		if (this.currencyId) {
			this.fetchCurrency(this.currencyId);
		}
	}

	deleteCurrency(): void {
		if (this.currencyId) {
			if (confirm("¿Está seguro de que desea eliminar esta moneda?")) {
				this.loading = true;
				this.currencyService
					.deleteCurrency(this.currencyId)
					.then(() => {
						this.loading = false;
						this.router.navigate(["/currency-ic"]);
					})
					.catch((err) => {
						this.loading = false;
						this.error = "Error al eliminar la moneda.";
						console.error(err);
					});
			}
		} else {
			this.error = "ID de moneda inválido.";
		}
	}
}
