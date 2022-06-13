import { Advertisement } from 'Models/Advertisement';
import { InitialState } from 'Models/redux';
import { Nullable } from 'Utils/typeScript';

type AdvertisementWithoutOwner = Omit<Advertisement, 'owner'>;
type AdvertisementUser = Pick<Advertisement, 'user'>;

export type InitialStateAdvertisement = InitialState<
Nullable<AdvertisementWithoutOwner> & AdvertisementUser
>;
