import { useState } from 'react';
import styled from 'styled-components';

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  padding: 0.75rem 1.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  text-align: center;

  &:hover {
    background: #5a6268;
  }
`;

function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError(null);
    } catch (err) {
      setError('Error encoding: ' + (err as Error).message);
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError(null);
    } catch (err) {
      setError('Error decoding: ' + (err as Error).message);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (mode === 'encode') {
        setInput(content);
      } else {
        setInput(content);
      }
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsText(file);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <Container>
      <h2>Base64 Encoder/Decoder</h2>
      <ButtonGroup>
        <Button
          onClick={() => setMode('encode')}
          style={{ background: mode === 'encode' ? '#0056b3' : '#007bff' }}
        >
          Encode
        </Button>
        <Button
          onClick={() => setMode('decode')}
          style={{ background: mode === 'decode' ? '#0056b3' : '#007bff' }}
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
        <Button onClick={mode === 'encode' ? handleEncode : handleDecode} disabled={!input}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>
        <FileLabel>
          Upload File
          <FileInput
            type="file"
            onChange={handleFileUpload}
            accept=".txt,.json,.xml,.html,.css,.js"
          />
        </FileLabel>
        <Button onClick={clearAll} disabled={!input && !output}>
          Clear All
        </Button>
      </ButtonGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {output && (
        <>
          <h3>Result:</h3>
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

export default Base64Converter; 