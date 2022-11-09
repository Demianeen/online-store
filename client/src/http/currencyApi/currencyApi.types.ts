/**
 * full data from api looks like
 * {
	"motd": {
		"msg": "If you or your company use this project or like what we doing, please consider backing us so we can continue maintaining and evolving this project.",
		"url": "https://exchangerate.host/#/donate"
	},
	"success": true,
	"base": "USD",
	"date": "2022-11-14",
	"rates": {
		"EUR": 0.969976,
		"UAH": 36.782646,
		"USD": 1
	}
}
*/
export interface ICurrencyApiResponse {
  base: string
  rates: Record<string, number>
}
