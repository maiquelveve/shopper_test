import { Request, Response } from "express";
import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";

export const getFileCSV = async (
  req: Request, 
  res: Response
): Promise<Response> => {

  try {
    return res.status(200).json(RETURNED_API_SUCCESS({ data: [], messageSuccess: "TEST OK" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};

