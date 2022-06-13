export enum Field {
  advertisementSearch = 'advertisementSearch',
}

export interface InputPayload {
  field: Field,
  value: string,
}

interface Inputs {
  advertisementSearch: string,
}

export type InitialState = Inputs;
