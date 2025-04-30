export const calculateMonthlyPayment = (loanAmount, annualInterestRate, loanTermYears) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    return ((loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1));
};
export const calculateTotalPayment = (monthlyPayment, loanTermYears) => {
    return monthlyPayment * loanTermYears * 12;
};
export const calculateTotalInterest = (totalPayment, loanAmount) => {
    return totalPayment - loanAmount;
};
