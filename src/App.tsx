import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import Automate from './pages/Automate';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import Header from './components/Header';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 1600px) {
    max-width: 1400px;
  }

  @media (max-width: 1400px) {
    max-width: 1200px;
  }

  @media (max-width: 1200px) {
    max-width: 1000px;
  }

  @media (max-width: 1000px) {
    max-width: 800px;
    padding: 0 1rem;
  }

  @media (max-width: 800px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  min-height: 500px;

  @media (max-width: 1600px) {
    max-width: 900px;
  }

  @media (max-width: 1400px) {
    max-width: 800px;
  }

  @media (max-width: 1200px) {
    max-width: 700px;
  }

  @media (max-width: 1000px) {
    max-width: 100%;
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <GlobalStyles />
        <Router>
          <AppContainer>
            <SEO
              title="Toolzilla - Free Online Developer Tools"
              description="Free online developer tools for developers and professionals."
              keywords="developer tools, online tools, web tools"
            />
            <StructuredData
              type="WebSite"
              name="Toolzilla"
              description="Free online developer tools for developers and professionals."
              url="https://toolzilla.app"
            />
            <Header />
            <MainContent>
              <ContentWrapper>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/automate" element={<Automate />} />
                </Routes>
              </ContentWrapper>
            </MainContent>
            <ThemeToggle />
          </AppContainer>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App; 