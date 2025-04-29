export const calculateMonthlyPayment = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  return (
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
  );
};

export const calculateTotalPayment = (
  monthlyPayment: number,
  loanTermYears: number
): number => {
  return monthlyPayment * loanTermYears * 12;
};

export const calculateTotalInterest = (
  totalPayment: number,
  loanAmount: number
): number => {
  return totalPayment - loanAmount;
}; 