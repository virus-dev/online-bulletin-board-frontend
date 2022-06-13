/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sBrands = ({ brands }: RootState) => brands;
const sBrandsData = ({ brands }: RootState) => brands.data;
const sBrandsIsLoading = ({ brands }: RootState) => brands.isLoading;

export const selectorBrands = createSelector([sBrands], (data) => data);
export const selectorBrandsData = createSelector([sBrandsData], (data) => data);
export const selectorBrandsIsLoading = createSelector([sBrandsIsLoading], (data) => data);
