import { Injectable, inject } from "@angular/core";
import { API } from "../constants/api";
import { ApiService } from "./api-service.service";
import { User, RegisterData, SubscriptionData } from "../interfaces/user";
@Injectable({
	providedIn: "root",
})
export class UserService extends ApiService {
	async getSub() {
		const response = await fetch(API + `User/GetSub`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const res = await response.text(); // Usa .text() para obtener la respuesta como string
		return res;
	}

	async updateSubscription(newSubscriptionId: SubscriptionData) {
		const res = await fetch(API + `User/updateSubscription`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(newSubscriptionId),
		});
		return res;
	}

	async getConvertCount() {
		const res = await this.getAuth("subscription/GetConvertCount");
		const resJson = await res.json();
		return resJson;
	}

	async getRole() {
		const res = await this.getAuth("User/GetRole");
		const resText = await res.text();
		console.log("getRole response:", resText);
		return resText;
	}

	async isAdmin() {
		try {
			const res = await this.getAuth("User/GetRole");
			const resText = await res.text();
			if (resText === "ADMIN") {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error("Error al verificar el rol de administrador:", error);
			return false;
		}
	}
}
