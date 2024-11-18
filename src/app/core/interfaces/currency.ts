export interface Currency {
	id: number;
	code: string;
	name: string;
	symbol: string;
	ConvertibilityIndex: number;
}

export interface CurrencyForCreation {
	code: string;
	name: string;
	symbol: string;
	ConvertibilityIndex: number;
}
