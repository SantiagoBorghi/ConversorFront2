import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth-service.service";
import { CurrencyService } from "../../services/currency-service.service";
import { Currency } from "../../interfaces/currency";

@Component({
	selector: "app-currencies-ic",
	standalone: true,
	imports: [RouterModule, CommonModule],
	templateUrl: "./currencies-ic.component.html",
	styleUrls: ["./currencies-ic.component.scss"],
})
export class CurrenciesICComponent implements OnInit {
	private authService = inject(AuthService);
	private currencyService = inject(CurrencyService);
	private router = inject(Router);

	currencies: Currency[] = [];
	loading: boolean = false;
	error: string | null = null;

	ngOnInit(): void {
		this.fetchCurrencies();
	}

	fetchCurrencies(): void {
		this.loading = true;
		this.currencyService
			.getAllCurrency()
			.then((data) => {
				this.currencies = data;
				this.loading = false;
			})
			.catch((error) => {
				this.error = error;
				this.loading = false;
			});
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(["/login"]);
	}

	editCurrency(currency: Currency): void {
		this.router.navigate([`/edit-currency/${currency.id}`]);
	}
}
