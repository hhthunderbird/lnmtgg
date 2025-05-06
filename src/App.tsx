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
import Header from './components/Header';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import AdSenseAd from './components/AdSenseAd';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <SEO
          title="Toolzilla - Every tool you need, in one place"
          description="Free online tools for developers and everyday users. JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and more."
          keywords="online tools, developer tools, json formatter, base64 converter, loan calculator, url encoder, color converter, hash generator"
        />
        <StructuredData
          type="WebSite"
          name="Toolzilla - Online Developer Tools"
          description="Free online tools for developers and everyday users. JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and more."
          url="https://toolzilla.app"
          potentialAction={{
            '@type': 'SearchAction',
            target: 'https://toolzilla.app/search?q={search_term_string}'
          }}
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
          client="ca-pub-XXXXXXXXXXXXXXXX"
          slot="XXXXXXXXXXXXXXXX"
          format="auto"
          responsive={true}
          debug={true}
        />
      </AppContainer>
    </Router>
  );
};

export default App; 