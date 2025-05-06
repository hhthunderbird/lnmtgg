import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a73e8;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 1rem;
`;

const HashResult = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  word-break: break-all;
`;

const AlgorithmSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 200px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const algorithms = [
  { id: 'SHA-256', name: 'SHA-256' },
  { id: 'SHA-384', name: 'SHA-384' },
  { id: 'SHA-512', name: 'SHA-512' },
];

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [hash, setHash] = useState('');

  const generateHash = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch (error) {
      console.error('Error generating hash:', error);
      setHash('Error generating hash');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
  };

  const handleClear = () => {
    setInput('');
    setHash('');
  };

  return (
    <Container>
      <SEO
        title="Hash Generator - Free Online Tool"
        description="Free online hash generator. Generate SHA-256, SHA-384, and SHA-512 hashes from your text. Fast, secure, and easy to use."
        keywords="hash generator, sha-256, sha-384, sha-512, hash calculator"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Hash Generator"
        description="Free online hash generator. Generate SHA-256, SHA-384, and SHA-512 hashes from your text. Fast, secure, and easy to use."
        url="https://toolzilla.app/hash-generator"
      />
      <Title>Hash Generator</Title>
      <Description>
        Generate secure hashes from your text using various algorithms.
      </Description>
      <AlgorithmSelect
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        {algorithms.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </AlgorithmSelect>
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to generate hash..."
      />
      <ButtonGroup>
        <Button onClick={generateHash} disabled={!input}>
          Generate Hash
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </ButtonGroup>
      {hash && (
        <ResultContainer>
          <ResultTitle>Generated Hash:</ResultTitle>
          <HashResult>{hash}</HashResult>
          <Button onClick={handleCopy} style={{ marginTop: '1rem' }}>
            Copy Hash
          </Button>
        </ResultContainer>
      )}
    </Container>
  );
};

export default HashGenerator; 