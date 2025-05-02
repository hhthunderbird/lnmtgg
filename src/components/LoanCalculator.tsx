import React, { useState } from 'react';
import styled from 'styled-components';
import { calculateMonthlyPayment, calculateTotalInterest, calculateTotalPayment } from '../utils/loanCalculations';

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Results = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

interface LoanFormData {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

const LoanCalculator: React.FC = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: 300000,
    interestRate: 3.5,
    loanTerm: 30,
  });

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const monthlyPayment = calculateMonthlyPayment(
      formData.loanAmount,
      formData.interestRate,
      formData.loanTerm
    );
    const totalPayment = calculateTotalPayment(monthlyPayment, formData.loanTerm);
    const totalInterest = calculateTotalInterest(totalPayment, formData.loanAmount);

    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="loanAmount">Loan Amount ($)</Label>
        <Input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          min="0"
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input
          type="number"
          id="interestRate"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          min="0"
          step="0.1"
          required
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="loanTerm">Loan Term (years)</Label>
        <Input
          type="number"
          id="loanTerm"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleChange}
          min="1"
          required
        />
      </InputGroup>

      <Button type="submit">Calculate</Button>

      {results.monthlyPayment > 0 && (
        <Results>
          <ResultItem>
            <span>Monthly Payment:</span>
            <span>${results.monthlyPayment.toFixed(2)}</span>
          </ResultItem>
          <ResultItem>
            <span>Total Interest:</span>
            <span>${results.totalInterest.toFixed(2)}</span>
          </ResultItem>
          <ResultItem>
            <span>Total Payment:</span>
            <span>${results.totalPayment.toFixed(2)}</span>
          </ResultItem>
        </Results>
      )}
    </Form>
  );
};

export default LoanCalculator; 