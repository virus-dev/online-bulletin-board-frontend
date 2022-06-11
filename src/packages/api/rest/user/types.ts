import { User } from 'Models/User';

export type UserResponseData = User & { token: string };
