import { describe, it, expect } from 'vitest';
import {
  calculateMonthlyPayment,
  calculateTotalPayment,
  calculateTotalInterest,
} from '../loanCalculations';

describe('Loan Calculations', () => {
  describe('calculateMonthlyPayment', () => {
    it('should calculate correct monthly payment for a 30-year mortgage', () => {
      const loanAmount = 300000;
      const interestRate = 3.5;
      const loanTerm = 30;
      
      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      expect(monthlyPayment).toBeCloseTo(1347.13, 2);
    });

    it('should calculate correct monthly payment for a 15-year mortgage', () => {
      const loanAmount = 300000;
      const interestRate = 3.5;
      const loanTerm = 15;
      
      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      expect(monthlyPayment).toBeCloseTo(2144.65, 2);
    });
  });

  describe('calculateTotalPayment', () => {
    it('should calculate correct total payment for a 30-year mortgage', () => {
      const monthlyPayment = 1347.13;
      const loanTerm = 30;
      
      const totalPayment = calculateTotalPayment(monthlyPayment, loanTerm);
      expect(totalPayment).toBeCloseTo(484966.80, 2);
    });
  });

  describe('calculateTotalInterest', () => {
    it('should calculate correct total interest for a 30-year mortgage', () => {
      const totalPayment = 484966.80;
      const loanAmount = 300000;
      
      const totalInterest = calculateTotalInterest(totalPayment, loanAmount);
      expect(totalInterest).toBeCloseTo(184966.80, 2);
    });
  });
}); 