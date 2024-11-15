import {
	Injectable,
	WritableSignal,
	inject,
	signal,
	Inject,
	PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { API } from "../constants/api";
import { LoginData, RegisterData } from "../interfaces/user";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private router = inject(Router);
	private platformId = inject(PLATFORM_ID);
	token: WritableSignal<string | null> = signal(null);

	constructor() {
		if (isPlatformBrowser(this.platformId)) {
			this.token.set(localStorage.getItem("token"));
		}
	}

	async login(loginData: LoginData) {
		try {
			const res = await fetch(`${API}authentication/authenticate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});
			if (!res.ok) return false;
			const tokenRecibido = await res.text();
			localStorage.setItem("token", tokenRecibido);
			this.token.set(tokenRecibido);
			return true;
		} catch {
			return false;
		}
	}

	async register(user: RegisterData) {
		try {
			const res = await fetch(`${API}User/Register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			console.log("REGISTRANDO", res);
			return res;
		} catch (error) {
			console.error("Registro fallido", error);
			throw error;
		}
	}

	logout(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.token.set(null);
			localStorage.removeItem("token");
			this.router.navigate(["/"]);
		}
	}
}
