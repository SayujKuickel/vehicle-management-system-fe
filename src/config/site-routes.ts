/**
 * Site Routes Configuration
 * Centralized route directory with nested admin dashboard structure
 */
export const SITE_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  CUSTOMER: {
    PROFILE: {
      ROOT: "/customer/profile",
      MANAGE: "/customer/profile/manage",
    },
  },

  DASHBOARD: {
    ROOT: "/dashboard",
    PARTS: {
      ROOT: "/dashboard/parts",
      VIEW: (id: string) => `/dashboard/parts/${id}`,
      ADD: "/dashboard/parts/add",
      EDIT: (id: string) => `/dashboard/parts/${id}/edit`,
    },
    VENDOR: {
      ROOT: "/dashboard/vendor",
      VIEW: (id: string) => `/dashboard/vendor/${id}`,
      ADD: "/dashboard/vendor/add",
      EDIT: (id: string) => `/dashboard/vendor/${id}/edit`,
    },
    SALES_INVOICES: {
      ROOT: "/dashboard/sales-invoices",
      VIEW: (id: string) => `/dashboard/sales-invoices/${id}`,
      ADD: "/dashboard/sales-invoices/add",
      EDIT: (id: string) => `/dashboard/sales-invoices/${id}/edit`,
    },
  },
} as const;

/**
 * Public Routes - Accessible without authentication
 */
export const PUBLIC_ROUTES = [
  SITE_ROUTES.HOME,
  SITE_ROUTES.LOGIN,
  SITE_ROUTES.REGISTER,
  SITE_ROUTES.FORGOT_PASSWORD,
] as const;

/**
 * Private Routes - Require authentication
 */
export const PRIVATE_ROUTES = [
  SITE_ROUTES.CUSTOMER.PROFILE.ROOT,
  SITE_ROUTES.CUSTOMER.PROFILE.MANAGE,
  SITE_ROUTES.DASHBOARD.ROOT,
  SITE_ROUTES.DASHBOARD.PARTS.ROOT,
  SITE_ROUTES.DASHBOARD.PARTS.ADD,
  SITE_ROUTES.DASHBOARD.PARTS.VIEW(":id"),
  SITE_ROUTES.DASHBOARD.PARTS.EDIT(":id"),
  SITE_ROUTES.DASHBOARD.VENDOR.ROOT,
  SITE_ROUTES.DASHBOARD.VENDOR.ADD,
  SITE_ROUTES.DASHBOARD.VENDOR.VIEW(":id"),
  SITE_ROUTES.DASHBOARD.VENDOR.EDIT(":id"),
  SITE_ROUTES.DASHBOARD.SALES_INVOICES.ROOT,
  SITE_ROUTES.DASHBOARD.SALES_INVOICES.ADD,
  SITE_ROUTES.DASHBOARD.SALES_INVOICES.VIEW(":id"),
  SITE_ROUTES.DASHBOARD.SALES_INVOICES.EDIT(":id"),
] as const;

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => {
    return pathname === route || matchPathPattern(route, pathname);
  });
}

export function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTES.some((route) => {
    return pathname === route || matchPathPattern(route, pathname);
  });
}

function matchPathPattern(pattern: string, pathname: string): boolean {
  const patternRegex = new RegExp(
    "^" + pattern.replace(/\//g, "\\/").replace(/:[^/]+/g, "[^/]+") + "$",
  );
  return patternRegex.test(pathname);
}

export type SiteRouteKey = keyof typeof SITE_ROUTES;
