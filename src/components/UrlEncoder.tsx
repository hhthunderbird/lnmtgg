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

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setOutput('Error: Invalid input');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <Container>
      <SEO
        title="URL Encoder/Decoder - Free Online Tool"
        description="Free online URL encoder and decoder. Convert URLs to encoded format and decode encoded URLs. Fast, secure, and easy to use."
        keywords="url encoder, url decoder, url converter, encode url, decode url, percent encoding"
      />
      <StructuredData
        type="SoftwareApplication"
        name="URL Encoder/Decoder"
        description="Free online URL encoder and decoder. Convert URLs to encoded format and decode encoded URLs. Fast, secure, and easy to use."
        url="https://toolzilla.app/url-encoder"
      />
      <Title>URL Encoder/Decoder</Title>
      <Description>
        Convert URLs to encoded format and decode encoded URLs with this easy-to-use tool.
      </Description>
      <ButtonGroup>
        <Button
          onClick={() => setMode('encode')}
          style={{ background: mode === 'encode' ? '#1557b0' : '#1a73e8' }}
        >
          Encode
        </Button>
        <Button
          onClick={() => setMode('decode')}
          style={{ background: mode === 'decode' ? '#1557b0' : '#1a73e8' }}
        >
          Decode
        </Button>
      </ButtonGroup>
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter text to ${mode}...`}
      />
      <ButtonGroup>
        <Button onClick={handleConvert} disabled={!input}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <Button onClick={handleClear} disabled={!input && !output}>
          Clear
        </Button>
      </ButtonGroup>
      {output && (
        <ResultContainer>
          <ResultTitle>Result:</ResultTitle>
          <TextArea
            value={output}
            readOnly
            style={{ backgroundColor: '#f8f9fa' }}
          />
          <Button onClick={handleCopy}>Copy to Clipboard</Button>
        </ResultContainer>
      )}
    </Container>
  );
};

export default UrlEncoder; 