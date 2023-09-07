import Product from "../../models/product";

import { RETURNED_FILE_RESULT } from "../../returnsRequests";
import { calculatePercentLessValue, calculatePercentMoreValue } from "../../helpers";

export const itemsValidation = async (items: IProductsFile[]): Promise<IReturnedRequestFileResult[]> => {
  try {
    const returnResult: IReturnedRequestFileResult[] = [];

    for await (const item of items) {
      const product = await Product.findOne({ where: { code: item.code } });

      // Valida se o Código Existe
      if(!product) {
        returnResult.push(RETURNED_FILE_RESULT({ 
          data: {
            code: item.code,
            name: "",
            sales_price: 0,
            new_price: item.newPrice
          },
          isError: true,
          messageError: "Codigo não cadastrado."
        })); 
      } else {
        let isErrorRegister = false;

        // Valida se o novo valor eh ate 10% maior do que valor original
        const valueMax = calculatePercentMoreValue({ percent: 10, valueCurrent: product.sales_price });
        if(item.newPrice > valueMax) {
          isErrorRegister = true;
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: "Novo valor superior a 10%."
          }));
        }

        // Valida se o novo valor eh ate 10% menor do que valor original
        const valueMin = calculatePercentLessValue({ percent: 10, valueCurrent: product!.sales_price });
        if(item.newPrice < valueMin) {
          isErrorRegister = true;
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: "Novo valor inferior a 10%."
          }));
        }

        // Valida preço de custo dos ITEMS
        if(product.cost_price <= item.newPrice) {
          isErrorRegister = true;
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: "Novo valor maior que o preço de custo."
          })); 
        }

        // Valida se eh PACK e seu ITEMS
        
        if(!isErrorRegister) {
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: false,
            messageError: ""
          })); 
        }
      } 
    }

    return returnResult;

  } catch (error: any) {
    throw Error(error);
  }
};
