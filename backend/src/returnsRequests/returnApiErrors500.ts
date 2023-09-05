export const RETURNED_API_ERRORS_500 = (): IReturnedRequest => {
  return {
    isError: true,
    isSuccess: false,
    errors: ["Ocorreu um erro no sistema. Tente mais tarde!"],
    success: [],
    data: []
  };
};
