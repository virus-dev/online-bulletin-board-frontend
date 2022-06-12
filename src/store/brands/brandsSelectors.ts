/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sBrands = ({ categories }: RootState) => categories;
const sBrandsData = ({ categories }: RootState) => categories.data;
const sBrandsIsLoading = ({ categories }: RootState) => categories.isLoading;

export const selectorBrands = createSelector([sBrands], (data) => data);
export const selectorBrandsData = createSelector([sBrandsData], (data) => data);
export const selectorBrandsIsLoading = createSelector([sBrandsIsLoading], (data) => data);
