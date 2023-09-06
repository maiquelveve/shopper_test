import { Request, Response } from "express";
import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";
import { Readable } from "stream";
import readline from "readline";
import Product from "../../models/product";
interface IproductsFile {
  code: number;
  newPrice: number
}

interface IcalculatePercent {
  percent: number;
  valueCurrent: number
}

interface IproductsReturn {
  isError: boolean;
  error: string;
  data: {
    code: number;
    name: string;
    sales_price: number;
    new_price: number;
  }
}

export const getFileCSV = async (
  request: Request, 
  response: Response
): Promise<Response> => {

  try {
    const { file } = request;

    if(!file) {
      return response.status(200).json(RETURNED_API_ERRORS({errors: ["Envie um arquivo."]}));
    }

    const { buffer } = file;
    const readableFile = new Readable();

    readableFile.push(buffer);
    readableFile.push(null);
    
    let isHeaderFile = true;
    const productsFile: IproductsFile[] = [];
    const productLine = readline.createInterface({ input: readableFile });

    for await(const line of productLine) {
      const arrLine = line.split(",");

      if(isHeaderFile) {
        isHeaderFile = false;
        if(!layoutHeaderValidation(arrLine)) {
          return response.status(200).json(RETURNED_API_ERRORS({
            errors: ["Arquivo não está no layout padrão. 1ª linha deve ser o cabeçário padrão. Contate o administrador."]
          }));
        }

      } else {
        if(!fileLayoutDataValidation(arrLine)) {
          return response.status(200).json(RETURNED_API_ERRORS({
            errors: ["Arquivo não está no layout padrão. 1ª linha deve ser o cabeçário padrão. Contate o administrador."]
          }));
        }

        productsFile.push({
          code: Number(arrLine[0]),
          newPrice: Number(arrLine[1])
        });
      }
    }
    
    if(productsFile.length === 0) {
      return response.status(200).json(RETURNED_API_ERRORS({
        errors: ["Arquivo em branco."]
      }));
    }

    const result = await itemsValidation(productsFile);
    return response.status(200).json(RETURNED_API_SUCCESS({ data: result, messageSuccess: "TEST OK" }));

  } catch (error) {
    return response.status(500).json(RETURNED_API_ERRORS_500());
  }
};

const itemsValidation = async (items: IproductsFile[]): Promise<IproductsReturn[]> => {
  try {
    const returnResult: IproductsReturn[] = [];

    for await (const item of items) {
      const product = await Product.findOne({ where: { code: item.code } });

      // Valida se o Código Existe
      if(!product) {
        returnResult.push({
          isError: true,
          error: "Codigo não cadastrado.",
          data: {
            code: item.code,
            name: "",
            sales_price: 0,
            new_price: item.newPrice
          }
        });  
      } else {

        let isErrorRegister = false;
        // Valida se o novo valor eh ate 10% maior do que valor original
        const valueMax = calculatePercentMoreValue({ percent: 10, valueCurrent: product.sales_price });
        if(item.newPrice > valueMax) {
          isErrorRegister = true;
          returnResult.push({
            isError: true,
            error: "Novo valor superior a 10%.",
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            }
          }); 
        }

        // Valida se o novo valor eh ate 10% menor do que valor original
        const valueMin = calculatePercentLessValue({ percent: 10, valueCurrent: product!.sales_price });
        if(item.newPrice < valueMin) {
          isErrorRegister = true;
          returnResult.push({
            isError: true,
            error: "Novo valor inferior a 10%.",
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            }
          }); 
        }

        // Valida preço de custo dos ITEMS
        if(product.cost_price <= item.newPrice) {
          isErrorRegister = true;
          returnResult.push({
            isError: true,
            error: "Novo valor maior que o preço de custo.",
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            }
          }); 
        }

        // Valida se eh PACK e seu ITEMS
        
        if(!isErrorRegister) {
          returnResult.push({
            isError: false,
            error: "",
            data: {
              code: product.code,
              name: product.name,
              sales_price: Number(product.sales_price),
              new_price: Number(item.newPrice)
            }
          }); 
        }
      } 
    }

    return returnResult;

  } catch (error: any) {
    throw Error(error);
  }
};

const calculatePercentMoreValue = ({ percent, valueCurrent }: IcalculatePercent): number => {
  return Number(valueCurrent) + Number(((valueCurrent * percent) / 100));
};

const calculatePercentLessValue = ({ percent, valueCurrent }: IcalculatePercent): number => {
  return Number(valueCurrent) - Number(((valueCurrent * percent) / 100));
};

const fileLayoutDataValidation = (data: any[]): boolean => {
  if(data.length < 2) {
    return false;
  }

  if(Number(data[0]) <= 0 || Number(data[1]) <= 0 ) {
    return false;
  }

  return true;
};

const layoutHeaderValidation = (headerString: string[]): boolean => {
  if(headerString[0] !== "product_code" || headerString[1] !== "new_price") {
    return false;
  }

  return true;
};

