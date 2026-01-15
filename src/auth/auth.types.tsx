export interface LoginPayload {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}
