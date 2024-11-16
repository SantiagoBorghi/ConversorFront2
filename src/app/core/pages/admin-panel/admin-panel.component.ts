import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth-service.service";

@Component({
	selector: "app-admin-panel",
	standalone: true,
	imports: [],
	templateUrl: "./admin-panel.component.html",
	styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent {
	private authService = inject(AuthService);

	logout(): void {
		this.authService.logout();
	}
}
