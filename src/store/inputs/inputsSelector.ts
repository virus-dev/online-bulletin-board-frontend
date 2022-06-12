/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sInputsAdvertisementSearch = ({ inputs }: RootState) => inputs.advertisementSearch;

export const selectorInputsAdvertisementSearch = createSelector([sInputsAdvertisementSearch], (data) => data);
