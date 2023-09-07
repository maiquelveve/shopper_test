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
            returnResult.push(RETURNED_FILE_RESULT({ 
              data: {
                code: product.code,
                name: product.name,
                sales_price: Number(product.sales_price),
                new_price: Number(item.newPrice)
              },
              isError: true,
              messageError: "Item que compeõe o paco não consta no arquivo enviado.",
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
    console.log(error);
    throw Error(error);
  }
};
