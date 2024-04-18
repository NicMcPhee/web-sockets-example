export interface UserCount {
  event: UserChangeEvent;
  userCount: number;
}

export type UserChangeEvent = 'add-user' | 'delete-user'
