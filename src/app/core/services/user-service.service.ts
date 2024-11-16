import { Injectable, inject } from "@angular/core";
import { API } from "../constants/api";
import { ApiService } from "./api-service.service";
import { User, RegisterData, SubscriptionData } from "../interfaces/user";
@Injectable({
	providedIn: "root",
})
export class UserService extends ApiService {
	async getUsers(): Promise<User[]> {
		const res = await this.getAuth("User");
		const resJson = await res.json();
		return resJson;
	}

	async getById(userId: number | string): Promise<User | undefined> {
		const res = await this.getAuth("User/GetUserById/" + userId);
		const resJson = await res.json();
		console.log(resJson);
		return resJson;
	}

	async create(user: RegisterData): Promise<boolean> {
		if (!user.email || !user.password || !user.username) return false;
		const res = await fetch(API + "User/userCreation", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(user),
		});
		return res.ok;
	}

	async update(user: User): Promise<boolean> {
		console.log(user);
		if (!user.userID) return false;
		const res = await fetch(API + "User?userId=" + user.userID, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
			body: JSON.stringify(user),
		});
		if (res.ok) {
			// La solicitud fue exitosa
			return true;
		} else if (res.status === 404) {
			// El usuario no se encontró en la base de datos
			return false;
		} else {
			// Manejar otros casos de error
			// Por ejemplo, puedes lanzar una excepción o realizar alguna acción específica
			throw new Error("Error al actualizar el usuario");
		}
	}

	async delete(userId: number): Promise<boolean> {
		const res = await fetch(API + "User?userId=" + userId, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
				Authorization: "Bearer " + this.auth.token(),
			},
		});
		return res.ok;
	}

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
