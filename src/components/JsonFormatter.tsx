import { useState } from 'react';
import styled from 'styled-components';

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

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 4px;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  padding: 1rem;
  background: #d4edda;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

function JsonFormatter() {
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
    <Container>
      <h2>JSON Formatter & Validator</h2>
      <TextArea
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
          <TextArea
            value={output}
            readOnly
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </>
      )}
    </Container>
  );
}

export default JsonFormatter; 