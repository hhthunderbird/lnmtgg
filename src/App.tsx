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
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import Header from './components/Header';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64-converter" element={<Base64Converter />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/url-encoder" element={<UrlEncoder />} />
          <Route path="/color-converter" element={<ColorConverter />} />
          <Route path="/hash-generator" element={<HashGenerator />} />
        </Routes>
        <AdSenseAd
          client="ca-pub-4120129651355049"
          slot="3538486082"
          format="auto"
          responsive={true}
        />
      </AppContainer>
    </Router>
  );
};

export default App; 