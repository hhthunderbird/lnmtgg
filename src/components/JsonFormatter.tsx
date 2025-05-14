import React, { useState } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';
import JsonFormatterDocs from './JsonFormatter/JsonFormatterDocs';

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

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled(TextArea)`
  flex: 1;
`;

const OutputContainer = styled.div`
  margin-top: 1rem;
`;

const OutputTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a73e8;
  font-weight: 600;
`;

const Output = styled(TextArea)`
  flex: 1;
`;

const JsonFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setFormattedJson('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setFormattedJson('');
    }
  };

  const clearAll = () => {
    setJsonInput('');
    setFormattedJson('');
    setError(null);
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
        <Title>JSON Formatter</Title>
        <Description>
          Format, validate, and beautify your JSON data with proper indentation and syntax highlighting.
        </Description>

        <Button onClick={() => setShowDocs(!showDocs)}>
          {showDocs ? 'Hide Documentation' : 'Show Documentation'}
        </Button>

        {showDocs && <JsonFormatterDocs />}

        <InputContainer>
          <Input
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            rows={10}
          />
          <Button onClick={formatJson}>Format JSON</Button>
          <Button onClick={minifyJson}>Minify JSON</Button>
          <Button onClick={clearAll}>Clear</Button>
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {formattedJson && (
          <OutputContainer>
            <OutputTitle>Formatted JSON:</OutputTitle>
            <Output value={formattedJson} readOnly rows={10} />
          </OutputContainer>
        )}
      </Container>
    </>
  );
};

export default JsonFormatter; 