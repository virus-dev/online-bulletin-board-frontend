/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sAdvertisement = ({ advertisement }: RootState) => advertisement;

export const selectorAdvertisement = createSelector([sAdvertisement], (data) => data);
