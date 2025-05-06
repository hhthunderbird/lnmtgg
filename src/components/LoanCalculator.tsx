import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
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

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const Results = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

const ResultLabel = styled.span`
  font-weight: 500;
`;

const ResultValue = styled.span`
  color: #007bff;
  font-weight: 500;
`;

const LoanCalculator: React.FC = () => {
  const [loanType, setLoanType] = useState<'mortgage' | 'personal'>('mortgage');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm) * 12; // Total number of payments

    // Calculate monthly payment using the formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <>
      <SEO
        title="Loan Calculator - Mortgage & Personal Loan Calculator"
        description="Free online loan calculator for mortgages and personal loans. Calculate monthly payments, total interest, and total payment amount. Easy to use and accurate."
        keywords="loan calculator, mortgage calculator, personal loan calculator, monthly payment calculator, interest calculator, loan payment calculator"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Loan Calculator"
        description="Free online loan calculator for mortgages and personal loans. Calculate monthly payments, total interest, and total payment amount. Easy to use and accurate."
        url="https://toolzilla.app/loan-calculator"
      />
      <Container>
        <Title>Loan Calculator</Title>
        <Description>
          Calculate your monthly payments, total interest, and total payment amount for mortgages and personal loans.
        </Description>
        <Form onSubmit={calculateLoan}>
          <FormGroup>
            <Label>Loan Type</Label>
            <Select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value as 'mortgage' | 'personal')}
            >
              <option value="mortgage">Mortgage</option>
              <option value="personal">Personal Loan</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Loan Amount ($)</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              required
              min="0"
              step="1000"
            />
          </FormGroup>
          <FormGroup>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              required
              min="0"
              max="100"
              step="0.1"
            />
          </FormGroup>
          <FormGroup>
            <Label>Loan Term (Years)</Label>
            <Input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term"
              required
              min="1"
              max={loanType === 'mortgage' ? '30' : '10'}
              step="1"
            />
          </FormGroup>
          <Button type="submit">Calculate</Button>
        </Form>
        {results && (
          <Results>
            <ResultItem>
              <ResultLabel>Monthly Payment:</ResultLabel>
              <ResultValue>${results.monthlyPayment.toFixed(2)}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Total Payment:</ResultLabel>
              <ResultValue>${results.totalPayment.toFixed(2)}</ResultValue>
            </ResultItem>
            <ResultItem>
              <ResultLabel>Total Interest:</ResultLabel>
              <ResultValue>${results.totalInterest.toFixed(2)}</ResultValue>
            </ResultItem>
          </Results>
        )}
      </Container>
    </>
  );
};

export default LoanCalculator; 