export interface User {
  id: string;
  token: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Essay {
  id: string;
  numero: number;
  created_at: string;
}
