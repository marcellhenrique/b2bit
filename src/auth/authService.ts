import api from "./axiosConfig";
import { User, LoginResponse } from "../types/interfaces";

const API_URL = "/auth/login/";
const PROFILE_URL = "/auth/profile/";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(API_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login");
  }
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getProfile = async (): Promise<User> => {
  try {
    const response = await api.get<User>(PROFILE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter o perfil");
  }
};
