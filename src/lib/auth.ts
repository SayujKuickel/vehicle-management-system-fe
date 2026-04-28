/**
 * Authentication Utilities
 * Helper functions for managing authentication tokens and states
 */

const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";

/**
 * Save auth token to session storage
 */
export function saveAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

/**
 * Get auth token from session storage
 */
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

/**
 * Remove auth token (logout)
 */
export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Save user data
 */
export function saveAuthUser(user: any): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}

/**
 * Get user data
 */
export function getAuthUser(): any {
  if (typeof window !== "undefined") {
    const user = sessionStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
}
