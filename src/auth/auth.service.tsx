import { api } from '../api/axios';

import type { LoginPayload, LoginResponse } from './auth.types';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    '/admins/auth/login',
    payload
  );
  return response.data;
}