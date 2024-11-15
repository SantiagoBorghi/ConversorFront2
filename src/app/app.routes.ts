import { Routes } from "@angular/router";
import { LoginComponent } from "./core/pages/login/login.component";
import { RegisterComponent } from "./core/pages/register/register.component";
import { HomeComponent } from "./core/pages/home/home.component";
import { AdminPanelComponent } from "./core/pages/admin-panel/admin-panel.component";
import { SubscriptionOptionsComponent } from "./core/pages/subscription-options/subscription-options.component";

export const routes: Routes = [
	{ path: "", component: LoginComponent }, // Página principal
	{ path: "register", component: RegisterComponent },
	{ path: "home", component: HomeComponent },
	{ path: "admin-panel", component: AdminPanelComponent },
	{ path: "subscription-options", component: SubscriptionOptionsComponent },
	{ path: "**", redirectTo: "" },
];
