import { AxiosError } from 'axios';

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type Undefineable<T> = { [P in keyof T]: T[P] | undefined };

export const isAxiosError = (x: any): x is AxiosError => (x.isAxiosError === true);
