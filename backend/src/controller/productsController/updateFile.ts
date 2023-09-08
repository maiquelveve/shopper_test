import { Request, Response } from "express";

import Product from "../../models/Product";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { initialTransactionDB } from "../../helpers";

export const updateFile = async (
  request: Request<object, object, IProductsUpdated>, 
  response: Response
): Promise<Response> => {
  const transactionDB = await initialTransactionDB();

  try {
    request.body.data.map(async (item) => {
      try {
        await Product.update({ 
          sales_price: item.data.new_price 
        }, 
        { 
          where: { code:  item.data.code },
          transaction: transactionDB 
        });
      } catch (error) {
        await transactionDB.rollback();
        throw error;
      }
    });

    transactionDB.commit();
    return response.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "TEST OK" }));

  } catch (error) {
    return response.status(500).json(RETURNED_API_ERRORS_500());
  }
};
