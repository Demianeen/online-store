/**
 * full data from api looks like
 * {
  "base": "USD",
  "date": "2022-10-18",
  "rates": {
    "EUR": 1.014885,
    "UAH": 36.410965,
    "USD": 1
  },
  "success": true,
  "timestamp": 1666075023
}
*/
export interface ICurrencyApiResponse {
  base: string
  rates: Record<string, number>
}
