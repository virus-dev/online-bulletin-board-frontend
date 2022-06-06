/* eslint max-len: ["off"] */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Store/store';

// dialogs
const sMessagesDialogData = ({ messages }: RootState) => messages.dialogs.data;
const sMessagesDialogIsLoading = ({ messages }: RootState) => messages.dialogs.isLoading;

// chat
const sMessagesChatWithUserId = ({ messages }: RootState) => messages.chat.chatWithUserId;

// unreadMessagesCount
const sMessagesUnreadMessagesCount = ({ messages }: RootState) => messages.unreadMessagesCount;

export const selectorMessagesDialogData = createSelector([sMessagesDialogData], (data) => data);
export const selectorMessagesDialogIsLoading = createSelector([sMessagesDialogIsLoading], (data) => data);
export const selectorMessagesUnreadMessagesCount = createSelector([sMessagesUnreadMessagesCount], (data) => data);
export const selectorMessagesChatWithUserId = createSelector([sMessagesChatWithUserId], (data) => data);
