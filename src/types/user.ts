export type Status = 'fulfilled' | 'rejected' | 'none' | 'pending';

export interface UserData {
  id: number
  email: string
  name: string
  avatarUrl: string,
  token?: string
};

export interface LoginData {
  email: string,
  password: string
};
