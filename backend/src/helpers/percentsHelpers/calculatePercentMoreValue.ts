export const calculatePercentMoreValue = ({ percent, valueCurrent }: ICalculatePercent): number => {
  return Number(valueCurrent) + Number(((valueCurrent * percent) / 100));
};
