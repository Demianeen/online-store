/**
 * full data from api looks like
 * {
    "success": true,
    "timestamp": 1698066243,
    "base": "USD",
    "date": "2023-10-23",
    "rates": {
        "USD": 1,
        "EUR": 0.942325,
        "UAH": 36.550736
    }
	}
*/
export interface ICurrencyApiResponse {
  base: string;
  rates: Record<string, number>;
}
