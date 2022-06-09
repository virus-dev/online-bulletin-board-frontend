import { Advertisement } from './Advertisement';

type AdvertisementsKeys = 'id' | 'title' | 'price' | 'advertisementImages' | 'updatedAt';

export type Advertisements = Pick<Advertisement, AdvertisementsKeys>;
