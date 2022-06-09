import { Advertisements } from 'Models/Advertisements';

export interface AdsAreOver {
  adsAreOver: boolean,
}

export interface InitialStateAdvertisements extends AdsAreOver {
  data: Advertisements[],
  isLoading: boolean,
  error: null | string,
}

export function IsAdsAreOver(x: any): x is AdsAreOver { return x.adsAreOver === true; }
