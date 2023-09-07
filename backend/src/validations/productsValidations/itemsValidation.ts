import Pack from "../../models/Pack";
import Product from "../../models/Product";

import { RETURNED_FILE_RESULT } from "../../returnsRequests";
import { calculatePercentLessValue, calculatePercentMoreValue } from "../../helpers";

export const itemsValidation = async (items: IProductsFile[]): Promise<IReturnedRequestFileResult[]> => {
  try {
    const returnResult: IReturnedRequestFileResult[] = [];

    for await (const item of items) {
      const product = await Product.findOne({ where: { code: item.code } });
      const msgError: string[] = [];
      // Valida se o Código Existe
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
        let isErrorRegister = false;

        // Valida se o novo valor eh ate 10% maior do que valor original
        const valueMax = calculatePercentMoreValue({ percent: 10, valueCurrent: product.sales_price });
        if(item.newPrice > valueMax) {
          isErrorRegister = true;
          msgError.push("Novo valor superior a 10%.");
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: msgError
          }));
          continue;
        }

        // Valida se o novo valor eh ate 10% menor do que valor original
        const valueMin = calculatePercentLessValue({ percent: 10, valueCurrent: product!.sales_price });
        if(item.newPrice < valueMin) {
          isErrorRegister = true;
          msgError.push("Novo valor inferior a 10%.");
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: msgError
          }));
          continue;
        }

        // Valida preço de custo dos ITEMS
        if(product.cost_price >= item.newPrice) {
          isErrorRegister = true;
          msgError.push("Novo valor maior que o preço de custo.");
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: true,
            messageError: msgError
          })); 
          continue;
        }

        // Valida pack
        let totalpackValue = 0;
        const packItem = await Pack.findAll({ where: { pack_id: item.code }, include: { as: "product", model: Product }});

        if(packItem.length) {

          const itemComponent: IProductsFile[] = [];
          packItem.map(pack => {
            const item = items.find(itemComponent => itemComponent.code === pack.product_id);
            if(item) {
              itemComponent.push(item);
            }
          });
            
          if(!itemComponent.length) {
            isErrorRegister = true;
            msgError.push("Item que compeõe o paco não consta no arquivo enviado.");
            returnResult.push(RETURNED_FILE_RESULT({ 
              data: {
                code: product.code,
                name: product.name,
                sales_price: Number(product.sales_price),
                new_price: Number(item.newPrice)
              },
              isError: true,
              messageError: msgError,
            })); 
            continue;
          }

          // CALCULA OS VALORES DO PACOTE
          const itemsNoFile = packItem.filter(pack => !itemComponent.some(item => item.code === pack.product_id) );
          itemsNoFile.map(item => totalpackValue = totalpackValue + (Number(item.product?.sales_price) * item.qty) );
          
          itemComponent.map(item => {
            packItem.map(pack => {
              if(pack.product_id === item.code) {
                totalpackValue = totalpackValue + (item.newPrice * pack.qty);
              }
            });
          });
          
          if(totalpackValue !== item.newPrice) {
            isErrorRegister = true;
            msgError.push("A soma dos itens do pacote não são iguai ao valor total do pacote.");
            returnResult.push(RETURNED_FILE_RESULT({ 
              data: {
                code: product.code,
                name: product.name,
                sales_price: Number(product.sales_price),
                new_price: Number(item.newPrice)
              },
              isError: true,
              messageError: msgError,
            })); 
            continue;
          }
        }

        if(!isErrorRegister) {
          msgError.push("");
          returnResult.push(RETURNED_FILE_RESULT({ 
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            },
            isError: !msgError.length,
            messageError: msgError
          })); 
        }
      } 
    }

    return returnResult;

  } catch (error: any) {
    console.log(error);
    throw Error(error);
  }
};
