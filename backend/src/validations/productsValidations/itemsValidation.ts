import Pack from "../../models/Pack";
import Product from "../../models/Product";

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
          continue;
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
          continue;
        }

        // Valida preço de custo dos ITEMS
        if(product.cost_price >= item.newPrice) {
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
          continue;
        }

        // Valida pack
        let messageError = "";
        let totalpackValue = 0;
        const packItem = await Pack.findAll({ where: { pack_id: item.code }});

        if(packItem.length) {
          packItem.map(pack => {
            if(messageError !== "") {
              return;
            }

            const itemComponent = items.find(itemComponent => itemComponent.code === pack.product_id);
            if(!itemComponent) {
              messageError = `Item '${product.name}' não consta no arquivo enviado.`;
            } else {
              totalpackValue = Number((totalpackValue + (pack.qty * itemComponent.newPrice)).toFixed(2));
            }
          });

          if(messageError !== "") {
            returnResult.push(RETURNED_FILE_RESULT({ 
              data: {
                code: product.code,
                name: product.name,
                sales_price: Number(product.sales_price),
                new_price: Number(item.newPrice)
              },
              isError: true,
              messageError,
            })); 
            continue;
          }
          
          if(totalpackValue !== item.newPrice) {
            returnResult.push(RETURNED_FILE_RESULT({ 
              data: {
                code: product.code,
                name: product.name,
                sales_price: Number(product.sales_price),
                new_price: Number(item.newPrice)
              },
              isError: true,
              messageError: "A soma dos itens do pacote não são iguai ao valor total do pacote.",
            })); 
            continue;
          }
        }

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
