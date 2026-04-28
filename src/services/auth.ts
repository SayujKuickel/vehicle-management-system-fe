import { BaseService } from "@/lib/api/service";
import { AxiosResponse } from "axios";

interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

class AuthService extends BaseService {
  /**
   * Login - Public endpoint
   */
  async login(credentials: LoginPayload): Promise<AxiosResponse<any>> {
    return this.post("/auth/login", credentials, { isPrivate: false });
  }

  /**
   * Register - Public endpoint
   */
  async register(userData: RegisterPayload): Promise<AxiosResponse<any>> {
    return this.post("/auth/register", userData, { isPrivate: false });
  }

  /**
   * Forgot Password - Public endpoint
   */
  async forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<AxiosResponse<any>> {
    return this.post("/auth/forgot-password", payload, { isPrivate: false });
  }

  /**
   * Reset Password - Public endpoint
   */
  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<AxiosResponse<any>> {
    return this.post("/auth/reset-password", payload, { isPrivate: false });
  }

  /**
   * Logout - Private endpoint (requires authentication)
   */
  async logout(): Promise<AxiosResponse<any>> {
    return this.post("/auth/logout", {}, { isPrivate: true });
  }

  /**
   * Verify Token - Private endpoint (requires authentication)
   */
  async verifyToken(): Promise<AxiosResponse<any>> {
    return this.get("/auth/verify", { isPrivate: true });
  }

  /**
   * Refresh Token - Private endpoint (requires authentication)
   */
  async refreshToken(): Promise<AxiosResponse<any>> {
    return this.post("/auth/refresh", {}, { isPrivate: true });
  }
}

export const authService = new AuthService();
