/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sCategories = ({ categories }: RootState) => categories;
const sCategoriesData = ({ categories }: RootState) => categories.data;
const sCategoriesIsLoading = ({ categories }: RootState) => categories.isLoading;

export const selectorCategories = createSelector([sCategories], (data) => data);
export const selectorCategoriesData = createSelector([sCategoriesData], (data) => data);
export const selectorCategoriesIsLoading = createSelector([sCategoriesIsLoading], (data) => data);
