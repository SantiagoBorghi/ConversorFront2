import { Component, inject } from "@angular/core";
import { SubscriptionData } from "../../interfaces/user";
import { UserService } from "../../services/user-service.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-subscription-options",
	standalone: true,
	imports: [],
	templateUrl: "./subscription-options.component.html",
	styleUrl: "./subscription-options.component.scss",
})
export class SubscriptionOptionsComponent {
	userService = inject(UserService);
	router = inject(Router);

	SubscriptionUpdate: SubscriptionData = {
		newSubscriptionID: 0,
	};

	async updateSubscription(
		subscriptionID: SubscriptionData["newSubscriptionID"]
	) {
		this.SubscriptionUpdate.newSubscriptionID = subscriptionID;
		try {
			const res = await this.userService.updateSubscription(
				this.SubscriptionUpdate
			);
			if (res.ok) {
				this.router.navigate(["/home"]);
			}
		} catch (err) {
			console.warn("Error updating subscription", err);
		}
	}
}
