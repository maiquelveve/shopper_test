interface IReturnedRequestFileResultApi {
  isError: boolean;
  error: string[];
  data: {
    code: number;
    name: string;
    sales_price: number;
    new_price: number;
  }
}
