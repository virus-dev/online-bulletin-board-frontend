import { Advertisements } from 'Models/Advertisements';

type ImageUrl = { imageUrl: string };

export type AdvertisementsGetAllResponseData = Omit<Advertisements, 'advertisementImages'> & { advertisementImages: ImageUrl[] };
