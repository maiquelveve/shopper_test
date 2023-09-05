interface IReturnedRequest {
  isError: boolean,
  isSuccess: boolean,
  errors: string[],
  success: string[],
  data: any[]
}

interface IReturnedRequestSuccessProps {
  data: any[];
  messageSuccess: string;
}

interface IReturnedRequestErrorProps {
  errors: any[]
}
