import { Component, inject, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CurrencyService } from "../../services/currency-service.service";
import { AuthService } from "../../services/auth-service.service";
import { UserService } from "../../services/user-service.service";
import { Currency } from "../../interfaces/currency";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	private currencyService = inject(CurrencyService);
	private authService = inject(AuthService);
	private userService = inject(UserService);

	isAdmin: boolean = false;

	currencies: Currency[] = [];
	selectedCurrencyFrom: string = ""; // Moneda a convertir
	selectedCurrencyTo1: string = ""; // Primera moneda convertida
	selectedCurrencyTo2: string = ""; // Segunda moneda convertida
	amount: number = 0; // Monto a convertir

	convertedValue1: number = 0; // Resultado primera conversión
	convertedValue2: number = 0; // Resultado segunda conversión

	loading: WritableSignal<boolean> = signal(false);
	error: WritableSignal<string | null> = signal(null);
	convertCount: number = 0;

	ngOnInit() {
		this.loadCurrencies();
		this.loadConvertCount();
		this.checkAdminStatus();
	}

	private async checkAdminStatus(): Promise<void> {
		try {
			const role = await this.userService.getRole();
			this.isAdmin = role === "ADMIN";
		} catch (error) {
			console.error("Error al verificar el rol de administrador:", error);
			this.isAdmin = false;
		}
	}

	private async loadCurrencies(): Promise<void> {
		try {
			this.loading.set(true);
			const data: Currency[] =
				await this.currencyService.getAllCurrency();
			this.currencies = data;
		} catch (err) {
			console.error("Error al cargar las monedas:", err);
			this.error.set(
				"No se pudieron cargar las monedas. Inténtalo más tarde."
			);
		} finally {
			this.loading.set(false);
		}
	}

	private async loadConvertCount(): Promise<void> {
		try {
			const count = await this.userService.getConvertCount();
			console.log("Conteo de conversiones:", count);
			this.convertCount = count;
		} catch (err) {
			console.error("Error al obtener el conteo de conversiones:", err);
		}
	}

	async convertCurrency(): Promise<void> {
		if (
			!this.selectedCurrencyFrom ||
			!this.selectedCurrencyTo1 ||
			!this.selectedCurrencyTo2 ||
			this.amount <= 0
		) {
			this.error.set(
				"Por favor, completa todos los campos correctamente."
			);
			return;
		}
		try {
			this.loading.set(true);
			this.error.set(null);

			// Crear los DTOs para enviar al backend
			const dto1 = {
				amount: this.amount,
				ICfromConvert: await this.currencyService
					.getCurrencyIndex(this.selectedCurrencyFrom)
					.then((ic) => ic.index),
				ICtoConvert: await this.currencyService
					.getCurrencyIndex(this.selectedCurrencyTo1)
					.then((ic) => ic.index),
			};

			const dto2 = {
				amount: this.amount,
				ICfromConvert: dto1.ICfromConvert,
				ICtoConvert: await this.currencyService
					.getCurrencyIndex(this.selectedCurrencyTo2)
					.then((ic) => ic.index),
			};

			// Llamar al backend para la primera conversión
			const [result1, result2] = await Promise.all([
				this.currencyService.ConvertCurrency(
					dto1.amount,
					dto1.ICfromConvert,
					dto1.ICtoConvert
				),
				this.currencyService.ConvertCurrency(
					dto2.amount,
					dto2.ICfromConvert,
					dto2.ICtoConvert
				),
			]);

			this.convertedValue1 = result1;
			this.convertedValue2 = result2;
			await this.loadConvertCount();
		} catch (err) {
			console.error("Error al convertir monedas:", err);
			this.error.set(
				"Error al realizar la conversión. Inténtalo nuevamente."
			);
		} finally {
			this.loading.set(false);
		}
	}

	logout(): void {
		this.authService.logout();
	}
}
