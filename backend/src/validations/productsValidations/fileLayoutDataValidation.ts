export const fileLayoutDataValidation = (data: any[]): boolean => {
  if(data.length < 2) {
    return false;
  }

  if(Number(data[0]) <= 0 || Number(data[1]) <= 0 ) {
    return false;
  }

  return true;
};
