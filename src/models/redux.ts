export interface InitialState<T> {
  data: T,
  isLoading: boolean,
  error: string | null,
}
