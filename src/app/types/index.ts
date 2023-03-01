export interface Transaction {
  date: string;
  gross_amount: number;
  status: string;
  customer: string;
  swifter_id: string;
  external_id: string;
  source: string;
}

export interface GetQueryParams {
  search: string;
  statusFilter: string;
  page: number;
}