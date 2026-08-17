import { getSunatExchangeRate, SunatRateData } from '../sunat-exchange-rate';

export type { SunatRateData };

export async function getSunatNormalizedRate(targetDate?: string, forceRefresh: boolean = false): Promise<SunatRateData> {
  return await getSunatExchangeRate(targetDate, forceRefresh);
}
