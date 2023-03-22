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

interface Student {
  id: string;
  nome_completo: string;
}

export interface Url {
  id: string;
  redacao_id: string;
  correcao_id: string;
  url: string;
  anotacoes: string;
  comentarios: string;
}
export interface EssayDetails {
  id: string;
  aluno: Student;
  numero: number;
  created_at: string;
  urls: Url[];
}

export interface EssayAddFormData {
  file: File;
}

export interface EssayEditFormData {
  essayId: string;
  urlId: string;
  file: File;
}
