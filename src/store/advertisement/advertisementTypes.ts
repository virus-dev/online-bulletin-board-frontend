export interface InitialStateAdvertisement {
  advertisementImages: string[],
  id: number | null,
  userId: number | null,
  title: string | null,
  price: number | null,
  categoryId: number | null,
  brandId: number | null,
  status: string | null,
  description: string | null,
  createdAt: string | null,
  updatedAt: string | null,
  isLoading: boolean,
}
