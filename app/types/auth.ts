export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

