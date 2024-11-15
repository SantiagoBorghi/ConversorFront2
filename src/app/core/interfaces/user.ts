export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

export interface User {
	userID: number;
	subscriptionID: number;
	totalConversions: number;
	username: string;
	email: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface SubscriptionData {
	newSubscriptionID: number;
}
