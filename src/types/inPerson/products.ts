export interface InPersonProduct {
  id: string;
  name: string;
  status: 'Available' | 'Unavailable';
  description: string;
  details: Record<string, string>;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export interface InPersonProducts {
  items: InPersonProduct[];
  paginationToken?: string;
}