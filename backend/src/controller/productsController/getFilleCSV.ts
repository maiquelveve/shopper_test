import { Request, Response } from "express";
import { Readable } from "stream";
import readline from "readline";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";
import { fileLayoutDataValidation, itemsValidation, layoutHeaderValidation } from "../../validations/productsValidations";

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
    const productsFile: IProductsFile[] = [];
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
            errors: ["Arquivo não está no layout padrão. Contate o administrador."]
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
