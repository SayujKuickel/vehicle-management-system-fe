import { BaseService } from "@/lib/api/service";
import { removeAuthToken } from "@/lib/auth";
import { AxiosResponse } from "axios";

export type RegisterRole = "customer" | "staff";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  vehicleNumber?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
}

class AuthService extends BaseService {
  async login(
    credentials: LoginPayload,
  ): Promise<AxiosResponse<AuthResponse>> {
    return this.post<AuthResponse>("/api/auth/login", credentials, {
      isPrivate: false,
    });
  }

  async registerCustomer(
    userData: RegisterPayload,
  ): Promise<AxiosResponse<AuthResponse>> {
    return this.post<AuthResponse>("/api/auth/register/customer", userData, {
      isPrivate: false,
    });
  }

  async registerStaff(
    userData: RegisterPayload,
  ): Promise<AxiosResponse<AuthResponse>> {
    return this.post<AuthResponse>("/api/auth/register/staff", userData, {
      isPrivate: false,
    });
  }

  async register(
    role: RegisterRole,
    userData: RegisterPayload,
  ): Promise<AxiosResponse<AuthResponse>> {
    return role === "staff"
      ? this.registerStaff(userData)
      : this.registerCustomer(userData);
  }

  logout(): void {
    removeAuthToken();
  }

  supportsPasswordRecovery(): boolean {
    return false;
  }
}

export const authService = new AuthService();
