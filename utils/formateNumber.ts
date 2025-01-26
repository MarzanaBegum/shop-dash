export const formateNumber = (amount: number) => {
  return new Intl.NumberFormat("en-US").format(amount);
};
