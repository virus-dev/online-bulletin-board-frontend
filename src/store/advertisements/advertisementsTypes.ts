import { Advertisements } from 'Models/Advertisements';

export interface AdsAreOver {
  adsAreOver: boolean,
}

export interface InitialStateAdvertisements extends AdsAreOver {
  data: Advertisements[],
  isLoading: boolean,
  error: null | string,
}

// eslint-disable-next-line
// @ts-ignore: Unreachable code error
export function IsAdsAreOver(x): x is AdsAreOver { return x.adsAreOver === true; }
