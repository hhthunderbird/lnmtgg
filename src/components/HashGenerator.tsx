import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';
import { loadMarkdown } from '../utils/markdownLoader';

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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) => (active ? '#1a73e8' : '#f0f0f0')};
  color: ${({ active }) => (active ? 'white' : '#5f6368')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: ${({ active }) => (active ? '#1557b0' : '#e0e0e0')};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const TabContent = styled.div<{ active: boolean }>`
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const InputArea = styled.textarea`
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

const OutputArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const MarkdownContent = styled.div`
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--background-primary);
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
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
    background: var(--background-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background: var(--background-secondary);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;

const algorithms = [
  { id: 'SHA-256', name: 'SHA-256' },
  { id: 'SHA-384', name: 'SHA-384' },
  { id: 'SHA-512', name: 'SHA-512' },
];

const HashGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'guide' | 'faq'>('tool');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const [guideContent, setGuideContent] = useState('');
  const [faqContent, setFaqContent] = useState('');

  useEffect(() => {
    // Load guide and FAQ markdown content on initial mount
    loadMarkdown('/docs/tools/hash-generator/guide.md').then(setGuideContent);
    loadMarkdown('/docs/tools/hash-generator/faq.md').then(setFaqContent);
  }, []);

  const generateHash = () => {
    // Hash generation logic here
    setOutput('Generated hash will appear here...');
  };

  return (
    <>
      <SEO
        title="Hash Generator"
        description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text. Fast, secure, and easy to use."
        keywords="hash generator, md5, sha-1, sha-256, sha-512, hash tool"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Hash Generator"
        description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text. Fast, secure, and easy to use."
        url="https://toolzilla.app/hash-generator"
      />
      <Container>
        <Title>Hash Generator</Title>
        <Description>
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text with this easy-to-use tool.
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
            <InputArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
            />
            <Button onClick={generateHash}>Generate Hash</Button>
            {output && (
              <OutputArea
                value={output}
                readOnly
                placeholder="Generated hash will appear here..."
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

export default HashGenerator; 