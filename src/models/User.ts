export enum Role {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export interface User {
  id?: number | null,
  email?: string | null,
  phone?: string | null,
  role?: Role | null,
  firstName?: string | null,
  secondName?: string | null,
  image?: string | null,
}
