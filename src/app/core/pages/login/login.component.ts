import { Component, inject, signal } from "@angular/core";
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

	errorLogin = signal(false);
	cargando = signal(false);

	loginData: LoginData = {
		email: "",
		password: "",
	};
	async SubCheck() {
		const subscriptionStatus = await this.userService.getSub();
		console.log(subscriptionStatus); // Solo se llama una vez a getSub()
		if (subscriptionStatus == "No subscription") {
			this.router.navigate(["/subscription-options"]);
		} else {
			this.router.navigate(["/home"]);
		}
	}
	login() {
		this.errorLogin.set(false);
		this.cargando.set(true);
		this.authService.login(this.loginData).then(async (res) => {
			if (res) {
				await this.SubCheck();
			} else {
				this.errorLogin.set(true);
			}
			this.cargando.set(false);
		});
	}
}
