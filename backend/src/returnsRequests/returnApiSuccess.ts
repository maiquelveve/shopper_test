export const RETURNED_API_SUCCESS = ({ data, messageSuccess }: IReturnedRequestSuccessProps): IReturnedRequest => {
  return {
    isError: false,
    isSuccess: true,
    errors: [],
    success: [messageSuccess],
    data: [...data]
  };
};
