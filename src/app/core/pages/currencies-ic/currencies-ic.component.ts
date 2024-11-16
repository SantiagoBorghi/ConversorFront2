import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth-service.service";

@Component({
	selector: "app-currencies-ic",
	standalone: true,
	imports: [],
	templateUrl: "./currencies-ic.component.html",
	styleUrls: ["./currencies-ic.component.scss"],
})
export class CurrenciesICComponent {
	private authService = inject(AuthService);

	logout(): void {
		this.authService.logout();
	}
}
