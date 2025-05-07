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
`;

const BottomAdContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

const ViewportBottomAdContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <Router basename="/">
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
          url={config.app.url}
        />
        <Header />
        <MainContent>
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
            />
          </BottomAdContainer>
        </MainContent>
        <LateralAdSpace position="left" />
        <LateralAdSpace position="right" />
        <ViewportBottomAdContainer>
          <AdSenseAd
            client={config.adsense.client}
            slot={config.adsense.slot}
            format="auto"
            responsive={true}
          />
        </ViewportBottomAdContainer>
      </AppContainer>
    </Router>
  );
};

export default App; 