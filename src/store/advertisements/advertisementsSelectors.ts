/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sAdvertisements = ({ advertisements }: RootState) => advertisements;
const sAdvertisementsData = ({ advertisements }: RootState) => advertisements.data;
const sAdvertisementsIsLoading = ({ advertisements }: RootState) => advertisements.isLoading;
const sAdvertisementsError = ({ advertisements }: RootState) => advertisements.error;
const sAdvertisementsAdsAreOver = ({ advertisements }: RootState) => advertisements.adsAreOver;

export const selectorAdvertisements = createSelector([sAdvertisements], (data) => data);
export const selectorAdvertisementsData = createSelector([sAdvertisementsData], (data) => data);
export const selectorAdvertisementsIsLoading = createSelector([sAdvertisementsIsLoading], (data) => data);
export const selectorAdvertisementsError = createSelector([sAdvertisementsError], (data) => data);
export const selectorAdvertisementsAdsAreOver = createSelector([sAdvertisementsAdsAreOver], (data) => data);
