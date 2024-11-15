import { Component, inject, signal, WritableSignal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { RegisterData } from "../../interfaces/user";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [RouterModule, FormsModule, CommonModule],
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
	private authService = inject(AuthService);
	private router = inject(Router);
	errorRegister: WritableSignal<boolean> = signal(false);
	cargando: WritableSignal<boolean> = signal(false);

	userForCreation: RegisterData = {
		username: "",
		email: "",
		password: "",
	};

	async register(form: NgForm) {
		if (form.invalid) {
			this.errorRegister.set(true);
			return;
		}
		this.errorRegister.set(false);
		this.cargando.set(true);
		try {
			const res = await this.authService.register(this.userForCreation);
			if (res.ok) {
				this.router.navigate(["/login"]);
			} else {
				this.errorRegister.set(true);
			}
		} catch (err) {
			console.warn("Error registrando", err);
			this.errorRegister.set(true);
		}
		this.cargando.set(false);
	}
}
