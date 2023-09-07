export const RETURNED_FILE_RESULT = ({ data, messageError, isError }: IReturnedRequestFileResultProps): IReturnedRequestFileResult => {
  return {
    isError: isError,
    error: messageError,
    data,
  };
};
