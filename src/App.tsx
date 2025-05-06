import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './components/HomePage';
import JsonFormatter from './components/JsonFormatter';
import Base64Converter from './components/Base64Converter';
import LoanCalculator from './components/LoanCalculator';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import AdSenseAd from './components/AdSenseAd';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <SEO
          title="Toolzilla - Free Online Developer Tools"
          description="Free online developer tools collection including JSON Formatter, Base64 Encoder/Decoder, Loan Calculator, and more. Fast, secure, and easy to use tools for developers and professionals."
          keywords="developer tools, json formatter, base64 converter, loan calculator, online tools, web tools, free tools"
        />
        <StructuredData
          type="WebSite"
          name="Toolzilla - Free Online Developer Tools"
          description="Free online developer tools collection including JSON Formatter, Base64 Encoder/Decoder, Loan Calculator, and more. Fast, secure, and easy to use tools for developers and professionals."
          url="https://toolzilla.app"
          potentialAction={{
            '@type': 'SearchAction',
            target: 'https://toolzilla.app/search?q={search_term_string}',
          }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64-converter" element={<Base64Converter />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
        </Routes>
        <AdSenseAd
          client="ca-pub-4120129651355049"
          slot="f08c47fec0942fa0"
          debug={true}
        />
      </Router>
    </HelmetProvider>
  );
};

export default App; 