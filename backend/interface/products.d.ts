interface IProductsFileReturned {
  code: number;
  name: string;
  sales_price: number;
  new_price: number;
}

interface IProductsUpdated {
  data: IReturnedRequestFileResult[];
}

interface IProductsFile {
  code: number;
  newPrice: number
}
