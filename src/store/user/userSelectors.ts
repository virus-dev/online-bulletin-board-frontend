/* eslint max-len: ["off"] */
/* eslint import/prefer-default-export: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

const sUser = ({ user }: RootState) => user;
const sUserData = ({ user }: RootState) => user.data;
const sUserIsLoading = ({ user }: RootState) => user.isLoading;

export const selectorUser = createSelector([sUser], (data) => data);
export const selectorUserData = createSelector([sUserData], (data) => data);
export const selectorUserIsLoading = createSelector([sUserIsLoading], (data) => data);
