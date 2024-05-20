export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: User;
}

export interface Avatar {
  high: string;
  id: number;
  low: string;
  medium: string;
}

export interface User {
  avatar: Avatar | null;
  created: string;
  email: string;
  id: number;
  is_active: true;
  modified: string;
  name: string;
  role: string;
  type: string;
}
