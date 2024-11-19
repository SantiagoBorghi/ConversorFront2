import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { CurrencyService } from "../../services/currency-service.service";
import { Currency } from "../../interfaces/currency";

@Component({
	selector: "app-add-currency",
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: "./add-currency.component.html",
	styleUrls: ["./add-currency.component.scss"],
})
export class AddCurrencyComponent {
	private authService = inject(AuthService);
	private currencyService = inject(CurrencyService);
	private router = inject(Router);

	currency: Partial<Currency> = {
		name: "",
		code: "",
		symbol: "",
		ic: 0,
	};
	loading: boolean = false;
	successMessage: string | null = null;
	errorMessage: string | null = null;

	logout(): void {
		this.authService.logout();
		this.router.navigate(["/login"]);
	}

	addCurrency(): void {
		if (
			!this.currency.name ||
			!this.currency.code ||
			!this.currency.symbol ||
			this.currency.ic === null ||
			this.currency.ic === undefined ||
			this.currency.ic <= 0
		) {
			this.errorMessage = "Por favor, completa todos los campos.";
			this.successMessage = null;
			return;
		}

		this.loading = true;
		this.currencyService
			.addCurrency(this.currency as Currency)
			.then(() => {
				this.loading = false;
				this.successMessage = "Moneda agregada exitosamente.";
				this.errorMessage = null;
				this.currency = {
					name: "",
					code: "",
					symbol: "",
					ic: 0,
				};
			})
			.catch((error) => {
				this.loading = false;
				this.errorMessage = "Error al agregar la moneda.";
				this.successMessage = null;
				console.error(error);
			});
	}
}
