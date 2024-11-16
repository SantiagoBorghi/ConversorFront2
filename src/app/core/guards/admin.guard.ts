// src/app/core/guards/admin.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../services/user-service.service";

@Injectable({
	providedIn: "root",
})
export class AdminGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	async canActivate(): Promise<boolean> {
		try {
			const isAdmin = await this.userService.isAdmin();
			if (isAdmin) {
				return true;
			} else {
				this.router.navigate(["/home"]);
				return false;
			}
		} catch (error) {
			console.error("Error al verificar el rol de administrador:", error);
			this.router.navigate(["/home"]);
			return false;
		}
	}
}
