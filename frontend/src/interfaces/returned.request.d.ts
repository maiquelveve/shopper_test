interface IReturnedRequest {
  isError: boolean,
  isSuccess: boolean,
  errors: string[],
  success: string[],
  data: any[]
}
