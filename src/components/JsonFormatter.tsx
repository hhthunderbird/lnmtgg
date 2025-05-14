import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';
import JsonFormatterDocs from './JsonFormatter/JsonFormatterDocs';
import { loadMarkdown } from '../utils/markdownLoader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
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
  white-space: nowrap;

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
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled(TextArea)`
  flex: 1;
  min-width: 300px;
`;

const OutputContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const OutputTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a73e8;
  font-weight: 600;
`;

const Output = styled(TextArea)`
  flex: 1;
  width: 100%;
`;

const TabContainer = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? 'white' : '#5f6368'};
  border: 1px solid ${props => props.active ? '#1a73e8' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#1557b0' : '#f8f9fa'};
  }
`;

const TabContent = styled.div<{ active: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
`;

const MarkdownContent = styled.div`
  line-height: 1.6;
  color: #202124;
  
  h1, h2, h3, h4, h5, h6 {
    color: #1a73e8;
    margin: 1.5rem 0 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  code {
    background: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;

const JsonFormatter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'guide' | 'faq'>('tool');
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [guideContent, setGuideContent] = useState('');
  const [faqContent, setFaqContent] = useState('');

  useEffect(() => {
    if (activeTab === 'guide') {
      loadMarkdown('/docs/tools/json-formatter/guide.md').then(setGuideContent);
    } else if (activeTab === 'faq') {
      loadMarkdown('/docs/tools/json-formatter/faq.md').then(setFaqContent);
    }
  }, [activeTab]);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          Format, validate, and beautify your JSON data with our free online JSON formatter.
        </Description>

        <TabContainer>
          <TabButtons>
            <TabButton 
              active={activeTab === 'tool'} 
              onClick={() => setActiveTab('tool')}
            >
              Tool
            </TabButton>
            <TabButton 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')}
            >
              Guide
            </TabButton>
            <TabButton 
              active={activeTab === 'faq'} 
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </TabButton>
          </TabButtons>

          <TabContent active={activeTab === 'tool'}>
            <InputContainer>
              <Input
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON here..."
              />
              <Button onClick={formatJson}>Format</Button>
              <Button onClick={minifyJson}>Minify</Button>
              <Button onClick={handleCopy}>Copy</Button>
              <Button onClick={handleDownload}>Download</Button>
            </InputContainer>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <OutputContainer>
              <OutputTitle>Formatted JSON</OutputTitle>
              <Output value={formattedJson} readOnly />
            </OutputContainer>
          </TabContent>

          <TabContent active={activeTab === 'guide'}>
            <MarkdownContent dangerouslySetInnerHTML={{ __html: guideContent }} />
          </TabContent>

          <TabContent active={activeTab === 'faq'}>
            <MarkdownContent dangerouslySetInnerHTML={{ __html: faqContent }} />
          </TabContent>
        </TabContainer>
      </Container>
    </>
  );
};

export default JsonFormatter; 