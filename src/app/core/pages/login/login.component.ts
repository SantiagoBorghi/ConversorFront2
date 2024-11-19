import { Component, inject, signal, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { UserService } from "../../services/user-service.service";
import { LoginData } from "../../interfaces/user";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [RouterModule, CommonModule, FormsModule],
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	private authService = inject(AuthService);
	private userService = inject(UserService);
	private router = inject(Router);

	errorLogin: WritableSignal<boolean> = signal(false);
	cargando: WritableSignal<boolean> = signal(false);

	loginData: LoginData = {
		email: "",
		password: "",
	};
	async SubCheck(): Promise<void> {
		try {
			const subscriptionStatus = await this.userService.getSub();
			console.log(subscriptionStatus);
			if (subscriptionStatus === "No subscription") {
				this.router.navigate(["/subscription-options"]);
			} else {
				this.router.navigate(["/home"]);
			}
		} catch (error) {
			console.error("Error verifying subscription status:", error);
			this.router.navigate(["/home"]);
		}
	}

	async login(): Promise<void> {
		this.errorLogin.set(false);
		this.cargando.set(true);
		try {
			const res = await this.authService.login(this.loginData);
			if (res) {
				await this.SubCheck();
			} else {
				this.errorLogin.set(true);
			}
		} catch (err) {
			console.warn("Error signing in", err);
			this.errorLogin.set(true);
		} finally {
			this.cargando.set(false);
		}
	}
}
