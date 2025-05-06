import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './components/HomePage';
import JsonFormatter from './components/JsonFormatter';
import Base64Converter from './components/Base64Converter';
import LoanCalculator from './components/LoanCalculator';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <SEO
          title="Online Developer Tools"
          description="Free online developer tools including JSON Formatter, Base64 Encoder/Decoder, URL Encoder, Color Converter, and more. Fast, secure, and easy to use."
        />
        <StructuredData
          type="WebSite"
          name="Toolzilla - Online Developer Tools"
          description="Free online developer tools including JSON Formatter, Base64 Encoder/Decoder, URL Encoder, Color Converter, and more. Fast, secure, and easy to use."
          url="https://toolzilla.app"
          potentialAction={{
            '@type': 'SearchAction',
            target: 'https://toolzilla.app/search?q={search_term_string}',
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64-converter" element={<Base64Converter />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App; 