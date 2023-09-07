export const layoutHeaderValidation = (headerString: string[]): boolean => {
  if(headerString[0] !== "product_code" || headerString[1] !== "new_price") {
    return false;
  }

  return true;
};
