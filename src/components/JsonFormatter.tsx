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
  min-height: 200px;
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

const SuccessMessage = styled.div`
  color: #34a853;
  padding: 1rem;
  background: #e6f4ea;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
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

const InputArea = styled(TextArea)`
  margin-bottom: 1rem;
`;

const OutputArea = styled(TextArea)`
  margin-top: 1rem;
`;

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
      setSuccess('JSON successfully formatted!');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setSuccess(null);
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError(null);
      setSuccess('JSON is valid!');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setSuccess(null);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <SEO
        title="JSON Formatter & Validator"
        description="Free online JSON formatter, validator and beautifier. Format, validate and beautify your JSON data with this easy-to-use tool. Supports syntax highlighting and error detection."
        keywords="json formatter, json validator, json beautifier, json prettifier, format json, validate json, json tool"
      />
      <StructuredData
        type="SoftwareApplication"
        name="JSON Formatter & Validator"
        description="Free online JSON formatter, validator and beautifier. Format, validate and beautify your JSON data with this easy-to-use tool. Supports syntax highlighting and error detection."
        url="https://toolzilla.app/json-formatter"
      />
      <Container>
        <Title>JSON Formatter & Validator</Title>
        <Description>
          Format, validate and beautify your JSON data with this easy-to-use tool.
        </Description>
        <InputArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
        />
        <ButtonGroup>
          <Button onClick={formatJson} disabled={!input}>
            Format JSON
          </Button>
          <Button onClick={validateJson} disabled={!input}>
            Validate JSON
          </Button>
          <Button onClick={clearAll} disabled={!input && !output}>
            Clear All
          </Button>
        </ButtonGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {output && (
          <>
            <h3>Formatted Output:</h3>
            <OutputArea
              value={output}
              readOnly
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default JsonFormatter; 