//import React, { useState } from 'react';
import styled from 'styled-components';
import LoanCalculator from './components/LoanCalculator';
import AdSpace from './components/AdSpace';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const MainContent = styled.main`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function App() {
  return (
    <AppContainer>
      <MainContent>
        <h1>Loan & Mortgage Calculator</h1>
        <LoanCalculator />
      </MainContent>
      <Sidebar>
        <AdSpace />
        <AdSpace />
      </Sidebar>
    </AppContainer>
  );
}

export default App; 