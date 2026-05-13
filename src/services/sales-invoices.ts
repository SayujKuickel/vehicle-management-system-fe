import { BaseService } from "@/lib/api/service";
import { AxiosResponse } from "axios";

export interface SalesInvoiceQueryParams {
  UserUuid?: string;
  Limit?: number;
  Offset?: number;
  Search?: string;
}

export interface CreateSalesInvoiceItemDto {
  partId: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateSalesInvoiceDto {
  customerId: string;
  salesDate?: string;
  paidAmount?: number;
  notes?: string | null;
  items: CreateSalesInvoiceItemDto[];
}

export interface UpdateSalesInvoiceDto {
  customerId?: string | null;
  salesDate?: string | null;
  paidAmount?: number | null;
  notes?: string | null;
  items?: CreateSalesInvoiceItemDto[] | null;
}

export interface SalesInvoiceItem {
  partId: number;
  quantity: number;
  unitPrice: number;
  [key: string]: unknown;
}

export interface SalesInvoice {
  id: number;
  customerId?: string;
  salesDate?: string;
  paidAmount?: number;
  notes?: string | null;
  items?: SalesInvoiceItem[];
  [key: string]: unknown;
}

class SalesInvoiceService extends BaseService {
  async list(
    params: SalesInvoiceQueryParams = {},
  ): Promise<AxiosResponse<SalesInvoice[]>> {
      return super.get<SalesInvoice[]>("/api/sales-invoices", {
      isPrivate: true,
      params,
    });
  }

  async getById(id: number): Promise<AxiosResponse<SalesInvoice>> {
    return super.get<SalesInvoice>(`/api/sales-invoices/${id}`, {
      isPrivate: true,
    });
  }

  async create(
    payload: CreateSalesInvoiceDto,
  ): Promise<AxiosResponse<SalesInvoice>> {
    return this.post<SalesInvoice>("/api/sales-invoices", payload, {
      isPrivate: true,
    });
  }

  async update(
    id: number,
    payload: UpdateSalesInvoiceDto,
  ): Promise<AxiosResponse<SalesInvoice>> {
    return this.patch<SalesInvoice>(`/api/sales-invoices/${id}`, payload, {
      isPrivate: true,
    });
  }

  async deleteById(id: number): Promise<AxiosResponse<void>> {
    return super.delete<void>(`/api/sales-invoices/${id}`, {
      isPrivate: true,
    });
  }
}

export const salesInvoiceService = new SalesInvoiceService();
