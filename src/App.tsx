import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import JsonFormatter from './components/JsonFormatter';
import Base64Converter from './components/Base64Converter';
import LoanCalculator from './components/LoanCalculator';
import UrlEncoder from './components/UrlEncoder';
import ColorConverter from './components/ColorConverter';
import HashGenerator from './components/HashGenerator';
import AdSenseAd from './components/AdSenseAd';
import LateralAdSpace from './components/LateralAdSpace';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import Header from './components/Header';
import config from './config';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n/i18n';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  /* Ensure minimum spacing between content and ads */
  & > * {
    margin: 0 150px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
  min-height: 500px; /* Ensure minimum content height */
`;

const BottomAdContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
              description="Free online developer tools including JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and Hash Generator."
              keywords="developer tools, json formatter, base64 converter, loan calculator, url encoder, color converter, hash generator"
            />
            <StructuredData
              type="WebSite"
              name="Toolzilla"
              description="Free online developer tools including JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and Hash Generator."
              url="https://toolzilla.app"
            />
            <Header />
            <MainContent>
              <LateralAdSpace position="left" />
              <ContentWrapper>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/json-formatter" element={<JsonFormatter />} />
                  <Route path="/base64-converter" element={<Base64Converter />} />
                  <Route path="/loan-calculator" element={<LoanCalculator />} />
                  <Route path="/url-encoder" element={<UrlEncoder />} />
                  <Route path="/color-converter" element={<ColorConverter />} />
                  <Route path="/hash-generator" element={<HashGenerator />} />
                </Routes>
                <BottomAdContainer>
                  <AdSenseAd
                    client={config.adsense.client}
                    slot={config.adsense.slot}
                    format="auto"
                    responsive={true}
                    position="bottom"
                  />
                </BottomAdContainer>
              </ContentWrapper>
              <LateralAdSpace position="right" />
            </MainContent>
            <ThemeToggle />
          </AppContainer>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App; 