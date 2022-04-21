export enum Status {
  read = 'read',
  delivered = 'delivered',
}

export interface Message {
  id: number,
  fromUserId: number,
  toUserId: number,
  message: string,
  status: Status,
  createdAt: number,
}
