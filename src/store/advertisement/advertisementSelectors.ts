/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sAdvertisement = ({ advertisement }: RootState) => advertisement;
const sAdvertisementData = ({ advertisement }: RootState) => advertisement.data;
const sAdvertisementDataUser = ({ advertisement }: RootState) => advertisement.data.user;

export const selectorAdvertisement = createSelector([sAdvertisement], (data) => data);
export const selectorAdvertisementData = createSelector([sAdvertisementData], (data) => data);
export const selectorAdvertisementDataUser = createSelector([sAdvertisementDataUser], (data) => data);
