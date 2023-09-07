interface IReturnedRequest {
  isError: boolean,
  isSuccess: boolean,
  errors: string[],
  success: string[],
  data: any[]
}

interface IReturnedRequestSuccessProps {
  data: any[];
  messageSuccess: string;
}

interface IReturnedRequestErrorProps {
  errors: any[]
}

interface IReturnedRequestFileResultProps {
  isError: boolean;
  messageError: string;
  data: IProductsFileReturned;
}

interface IReturnedRequestFileResult {
  isError: boolean;
  error: string;
  data: {
    code: number;
    name: string;
    sales_price: number;
    new_price: number;
  }
}
