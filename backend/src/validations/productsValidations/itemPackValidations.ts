import Pack from "../../models/Pack";
import Product from "../../models/Product";

interface IPackValidationProps {
  item: IProductsFile;
  items: IProductsFile[];
}

export const itemPackValidation = async ({item, items}: IPackValidationProps) => {
  const msgError: string[] = [];

  try {
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
        msgError.push("Item que compeõe o paco não consta no arquivo enviado.");
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
        msgError.push("A soma dos itens do pacote não são iguai ao valor total do pacote.");
      }
    } 

    return msgError;

  } catch (error: any) {
    throw Error(error);
  }
};
