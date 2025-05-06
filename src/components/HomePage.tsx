import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a73e8;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ToolCard = styled(Link)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ToolTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a73e8;
`;

const ToolDescription = styled.p`
  color: #5f6368;
  margin: 0;
`;

interface Tool {
  id: string;
  title: string;
  description: string;
  path: string;
}

const tools: Tool[] = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate and beautify your JSON data with syntax highlighting.',
    path: '/json-formatter'
  },
  {
    id: 'base64-converter',
    title: 'Base64 Converter',
    description: 'Convert text to Base64 and decode Base64 to text. Fast and secure.',
    path: '/base64-converter'
  },
  {
    id: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and total payment for loans.',
    path: '/loan-calculator'
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs with support for special characters.',
    path: '/url-encoder'
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL, and other color formats.',
    path: '/color-converter'
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hash values.',
    path: '/hash-generator'
  }
];

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <SEO
        title="Toolzilla - Free Online Tools"
        description="Free online tools including JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and more. Fast, secure, and easy to use."
        keywords="online tools, json formatter, base64 converter, loan calculator, url encoder, color converter, hash generator"
      />
      <Title>Toolzilla</Title>
      <Description>
        Free online tools to make your work easier. Fast, secure, and easy to use.
      </Description>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <ToolsGrid>
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} to={tool.path}>
            <ToolTitle>{tool.title}</ToolTitle>
            <ToolDescription>{tool.description}</ToolDescription>
          </ToolCard>
        ))}
      </ToolsGrid>
    </Container>
  );
};

export default HomePage; 