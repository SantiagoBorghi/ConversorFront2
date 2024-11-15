import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CurrencyService } from "../../services/currency-service.service";
import { Currency } from "../../interfaces/currency";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss",
})
export class HomeComponent {
	currencyService = inject(CurrencyService);
	currencies: Currency[] = [];
	selectedCurrencyFrom: string = ""; // Moneda a convertir
	selectedCurrencyTo1: string = ""; // Primera moneda convertida
	selectedCurrencyTo2: string = ""; // Segunda moneda convertida
	amount: number = 0; // Monto a convertir
	convertedValue1: number = 0; // Resultado primera conversión
	convertedValue2: number = 0; // Resultado segunda conversión

	ngOnInit() {
		this.currencyService.getAllCurrency().then((data: Currency[]) => {
			this.currencies = data;
		});
	}

	async convertCurrency() {
		// Obtener el índice de conversión de las monedas seleccionadas
		const fromCurrencyIC = await this.currencyService.getCurrencyIndex(
			this.selectedCurrencyFrom
		);
		const toCurrency1IC = await this.currencyService.getCurrencyIndex(
			this.selectedCurrencyTo1
		);
		const toCurrency2IC = await this.currencyService.getCurrencyIndex(
			this.selectedCurrencyTo2
		);

		// Crear los DTOs para enviar al backend
		const dto1 = {
			amount: this.amount,
			ICfromConvert: fromCurrencyIC.index,
			ICtoConvert: toCurrency1IC.index,
		};

		const dto2 = {
			amount: this.amount,
			ICfromConvert: fromCurrencyIC.index,
			ICtoConvert: toCurrency2IC.index,
		};

		// Llamar al backend para la primera conversión
		const result1 = await this.currencyService.ConvertCurrency(
			dto1.amount,
			dto1.ICfromConvert,
			dto1.ICtoConvert
		);
		this.convertedValue1 = result1;

		// Llamar al backend para la segunda conversión
		const result2 = await this.currencyService.ConvertCurrency(
			dto2.amount,
			dto2.ICfromConvert,
			dto2.ICtoConvert
		);
		this.convertedValue2 = result2;
	}
}
