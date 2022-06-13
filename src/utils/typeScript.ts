import { AxiosError } from 'axios';

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type Undefineable<T> = { [P in keyof T]: T[P] | undefined };

// eslint-disable-next-line
// @ts-ignore: Unreachable code error
export const isAxiosError = (x): x is AxiosError => (x.isAxiosError === true);
