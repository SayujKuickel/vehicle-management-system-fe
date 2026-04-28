import { AxiosRequestConfig, AxiosResponse } from "axios";
import { publicAxios, privateAxios } from "./axios";

interface ServiceOptions extends AxiosRequestConfig {
  isPrivate?: boolean;
}

/**
 * Base Service Class
 * Provides HTTP methods with individual private/public mode control
 * Each function can specify isPrivate in options to control authentication
 * Default: public (false) - override per-request in each service method
 */
export abstract class BaseService {
  /**
   * Get the appropriate axios instance based on isPrivate flag
   */
  protected getAxiosInstance(isPrivate: boolean = false) {
    return isPrivate ? privateAxios : publicAxios;
  }

  /**
   * GET request
   * @param url - API endpoint
   * @param options - Request config with optional isPrivate flag
   */
  protected async get<T = any>(
    url: string,
    options: ServiceOptions = {},
  ): Promise<AxiosResponse<T>> {
    const { isPrivate = false, ...axiosConfig } = options;
    const axios = this.getAxiosInstance(isPrivate);
    return axios.get<T>(url, axiosConfig);
  }

  /**
   * POST request
   * @param url - API endpoint
   * @param data - Request body
   * @param options - Request config with optional isPrivate flag
   */
  protected async post<T = any>(
    url: string,
    data?: any,
    options: ServiceOptions = {},
  ): Promise<AxiosResponse<T>> {
    const { isPrivate = false, ...axiosConfig } = options;
    const axios = this.getAxiosInstance(isPrivate);
    return axios.post<T>(url, data, axiosConfig);
  }

  /**
   * PUT request
   * @param url - API endpoint
   * @param data - Request body
   * @param options - Request config with optional isPrivate flag
   */
  protected async put<T = any>(
    url: string,
    data?: any,
    options: ServiceOptions = {},
  ): Promise<AxiosResponse<T>> {
    const { isPrivate = false, ...axiosConfig } = options;
    const axios = this.getAxiosInstance(isPrivate);
    return axios.put<T>(url, data, axiosConfig);
  }

  /**
   * DELETE request
   * @param url - API endpoint
   * @param options - Request config with optional isPrivate flag
   */
  protected async delete<T = any>(
    url: string,
    options: ServiceOptions = {},
  ): Promise<AxiosResponse<T>> {
    const { isPrivate = false, ...axiosConfig } = options;
    const axios = this.getAxiosInstance(isPrivate);
    return axios.delete<T>(url, axiosConfig);
  }

  /**
   * PATCH request
   * @param url - API endpoint
   * @param data - Request body
   * @param options - Request config with optional isPrivate flag
   */
  protected async patch<T = any>(
    url: string,
    data?: any,
    options: ServiceOptions = {},
  ): Promise<AxiosResponse<T>> {
    const { isPrivate = false, ...axiosConfig } = options;
    const axios = this.getAxiosInstance(isPrivate);
    return axios.patch<T>(url, data, axiosConfig);
  }
}
