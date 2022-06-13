import { User } from './User';

export interface Advertisement {
  advertisementImages: string[],
  id: number,
  title: string,
  price: number,
  categoryId: number,
  brandId: number,
  status: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  user: User,
}
