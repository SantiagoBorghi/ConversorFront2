import { Injectable, inject } from "@angular/core";
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

	async getById(currencyId: number | string): Promise<Currency | undefined> {
		const res = await this.getAuth("Currency/" + currencyId);
		const resJson = await res.json();
		return resJson;
	}

	async create(currency: Currency): Promise<boolean> {
		if (currency.id) return false;
		const res = await fetch(API + "Currency/crear-nueva-moneda", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(currency),
		});
		return res.ok;
	}

	async update(currency: Currency): Promise<boolean> {
		if (!currency.id) return false;
		const res = await fetch(API + "Currency?currencyId=" + currency.id, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(currency),
		});
		return res.ok;
	}

	async delete(currencyId: number): Promise<boolean> {
		const res = await fetch(API + "Currency?currencyId=" + currencyId, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
		});
		return res.ok;
	}
}
