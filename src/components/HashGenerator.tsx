import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { createHash } from 'crypto';

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
  font-size: 14px;
  resize: vertical;
  margin-bottom: 1rem;

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
  margin-bottom: 1rem;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a73e8;
`;

const HashResult = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  word-break: break-all;
  margin-bottom: 1rem;
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

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('sha256');
  const [hash, setHash] = useState('');

  const algorithms = [
    'md5',
    'sha1',
    'sha256',
    'sha384',
    'sha512',
  ];

  const generateHash = () => {
    if (!input) return;
    const hash = createHash(algorithm).update(input).digest('hex');
    setHash(hash);
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
        description="Free online hash generator. Generate MD5, SHA1, SHA256, SHA384, and SHA512 hashes. Fast, secure, and easy to use."
        keywords="hash generator, md5, sha1, sha256, sha384, sha512, hash calculator"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Hash Generator"
        description="Free online hash generator. Generate MD5, SHA1, SHA256, SHA384, and SHA512 hashes. Fast, secure, and easy to use."
        url="https://toolzilla.app/hash-generator"
      />
      <Title>Hash Generator</Title>
      <Description>
        Generate MD5, SHA1, SHA256, SHA384, and SHA512 hashes from your text input.
      </Description>
      <AlgorithmSelect
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        {algorithms.map((algo) => (
          <option key={algo} value={algo}>
            {algo.toUpperCase()}
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
        <Button onClick={handleClear} disabled={!input && !hash}>
          Clear
        </Button>
      </ButtonGroup>
      {hash && (
        <ResultContainer>
          <ResultTitle>Generated Hash:</ResultTitle>
          <HashResult>{hash}</HashResult>
          <Button onClick={handleCopy}>Copy to Clipboard</Button>
        </ResultContainer>
      )}
    </Container>
  );
};

export default HashGenerator; 