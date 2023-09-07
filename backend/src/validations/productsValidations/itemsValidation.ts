import Product from "../../models/Product";

import { RETURNED_FILE_RESULT } from "../../returnsRequests";
import { calculatePercentLessValue, calculatePercentMoreValue } from "../../helpers";
import { itemPackValidation } from "./itemPackValidations";

export const itemsValidation = async (items: IProductsFile[]): Promise<IReturnedRequestFileResult[]> => {
  try {
    const returnResult: IReturnedRequestFileResult[] = [];

    for await (const item of items) {
      const product = await Product.findOne({ where: { code: item.code } });
      const msgError: string[] = [];

      if(!product) {
        msgError.push("Codigo não cadastrado.");
        returnResult.push(RETURNED_FILE_RESULT({ 
          data: {
            code: item.code,
            name: "",
            sales_price: 0,
            new_price: item.newPrice
          },
          isError: true,
          messageError: msgError
        })); 
      } else {

        const valueMax = calculatePercentMoreValue({ percent: 10, valueCurrent: product.sales_price });
        if(item.newPrice > valueMax) {
          msgError.push("Novo valor superior a 10%.");
        }

        const valueMin = calculatePercentLessValue({ percent: 10, valueCurrent: product!.sales_price });
        if(item.newPrice < valueMin) {
          msgError.push("Novo valor inferior a 10%.");
        }

        if(product.cost_price >= item.newPrice) {
          msgError.push("Novo valor maior que o preço de custo.");
        }

        const msg = await itemPackValidation({ item, items });
        msgError.push(...msg);

        returnResult.push(RETURNED_FILE_RESULT({ 
          data: {
            code: product.code,
            name: product.name,
            sales_price: Number(product.sales_price),
            new_price: Number(item.newPrice)
          },
          isError: !!msgError.length,
          messageError: msgError
        })); 
      }
    }

    return returnResult;
  } catch (error: any) {
    throw Error(error);
  }
};
