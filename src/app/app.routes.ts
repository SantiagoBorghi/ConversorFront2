import { Routes } from "@angular/router";
import { LoginComponent } from "./core/pages/login/login.component";
import { RegisterComponent } from "./core/pages/register/register.component";
import { HomeComponent } from "./core/pages/home/home.component";
import { CurrenciesICComponent } from "./core/pages/currencies-ic/currencies-ic.component";
import { SubscriptionOptionsComponent } from "./core/pages/subscription-options/subscription-options.component";
import { EditCurrencyComponent } from "./core/pages/edit-currency/edit-currency.component";
import { AdminGuard } from "./core/guards/admin.guard";

export const routes: Routes = [
	{ path: "", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "home", component: HomeComponent },
	{
		path: "currency-ic",
		component: CurrenciesICComponent,
		canActivate: [AdminGuard],
	},
	{
		path: "edit-currency/:id",
		component: EditCurrencyComponent,
		canActivate: [AdminGuard],
	},
	{ path: "subscription-options", component: SubscriptionOptionsComponent },
	{ path: "**", redirectTo: "" },
];
