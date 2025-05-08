import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background: #f8f9fa;

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
  font-weight: 500;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ea4335;
  padding: 1rem;
  background: #fce8e6;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a73e8;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModeButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) => (active ? '#1557b0' : '#1a73e8')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ active }) => (active ? '#1557b0' : '#1557b0')};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const InputArea = styled(TextArea)`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const OutputArea = styled(TextArea)`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError(null);
    } catch (err) {
      setError('Invalid input for ' + mode + 'ing');
      setOutput('');
    }
  };

  return (
    <>
      <SEO
        title="Base64 Encoder/Decoder"
        description="Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text. Fast, secure, and easy to use."
        keywords="base64 encoder, base64 decoder, base64 converter, encode base64, decode base64, base64 tool"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Base64 Encoder/Decoder"
        description="Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text. Fast, secure, and easy to use."
        url="https://toolzilla.app/base64-converter"
      />
      <Container>
        <Title>Base64 Encoder/Decoder</Title>
        <Description>
          Convert text to Base64 and decode Base64 to text with this easy-to-use tool.
        </Description>
        <ModeSelector>
          <ModeButton
            active={mode === 'encode'}
            onClick={() => setMode('encode')}
          >
            Encode
          </ModeButton>
          <ModeButton
            active={mode === 'decode'}
            onClick={() => setMode('decode')}
          >
            Decode
          </ModeButton>
        </ModeSelector>
        <InputArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter text to ${mode}...`}
        />
        <Button onClick={convert}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {output && (
          <OutputArea
            value={output}
            readOnly
            placeholder={`${mode === 'encode' ? 'Encoded' : 'Decoded'} text will appear here...`}
          />
        )}
      </Container>
    </>
  );
};

export default Base64Converter; 