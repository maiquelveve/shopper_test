export const calculatePercentLessValue = ({ percent, valueCurrent }: ICalculatePercent): number => {
  return Number(valueCurrent) - Number(((valueCurrent * percent) / 100));
};
