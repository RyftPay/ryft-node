export interface InPersonProductSku {
  id: string;
  name: string;
  country: string;
  totalAmount: number;
  currency: string;
  status: 'Available' | 'Unavailable';
  productId: string;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonProductSkus {
  items: InPersonProductSku[];
  paginationToken?: string | null | undefined;
}
