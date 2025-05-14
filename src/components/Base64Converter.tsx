import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { loadMarkdown } from '../utils/markdownLoader';

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

const Base64Converter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'guide' | 'faq'>('tool');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [guideContent, setGuideContent] = useState('');
  const [faqContent, setFaqContent] = useState('');

  useEffect(() => {
    if (activeTab === 'guide') {
      loadMarkdown('/docs/tools/base64-converter/guide.md').then(setGuideContent);
    } else if (activeTab === 'faq') {
      loadMarkdown('/docs/tools/base64-converter/faq.md').then(setFaqContent);
    }
  }, [activeTab]);

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

export default Base64Converter; 