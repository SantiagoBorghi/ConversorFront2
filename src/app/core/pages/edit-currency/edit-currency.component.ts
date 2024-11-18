// src/app/core/pages/edit-currency/edit-currency.component.ts
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
}
