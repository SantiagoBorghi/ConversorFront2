import { Injectable } from "@angular/core";
import { Currency } from "../interfaces/currency";
import { API } from "../constants/api";
import { ApiService } from "./api-service.service";

@Injectable({
	providedIn: "root",
})
export class CurrencyService extends ApiService {
	async getAllCurrency(): Promise<Currency[]> {
		const res = await fetch(API + "Currency/GetAllCurrencies", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
		});
		const data = await res.json();
		return data;
	}

	async getCurrencyById(id: number): Promise<Currency> {
		const res = await fetch(API + `Currency/GetCurrencyById/${id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
		});
		const data = await res.json();
		return data;
	}

	async updateCurrency(currency: Currency): Promise<void> {
		await fetch(API + "Currency/UpdateCurrency", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(currency),
		});
	}

	async ConvertCurrency(
		amount: number,
		ICfromConvert: number,
		ICtoConvert: number
	): Promise<number> {
		const res = await fetch(API + "Currency/Convert", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify({ amount, ICfromConvert, ICtoConvert }),
		});
		const data = await res.json();
		return data;
	}

	async getCurrencyIndex(currencyCode: string): Promise<{ index: number }> {
		const res = await fetch(
			API + `Currency/GetIndex?code=${currencyCode}`,
			{
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Authorization: "Bearer " + this.auth.token(),
				},
			}
		);
		const data = await res.json();
		return data;
	}
}
