export const RETURNED_API_ERRORS = ({ errors }: IReturnedRequestErrorProps): IReturnedRequest => {
  return {
    isError: true,
    isSuccess: false,
    errors: errors.length ? [...errors] : ["Ocorreu um erro no sistema. Contate o administrador."],
    success: [],
    data: []
  };
};
