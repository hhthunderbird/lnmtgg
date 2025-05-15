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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? '#1a73e8' : '#ccc'};
  color: ${props => props.active ? 'white' : '#5f6368'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#ddd'};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const TabContent = styled.div<{ active: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
`;

const InputArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const OutputArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: monospace;
  background: #f9f9f9;

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

const ColorConverter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'guide' | 'faq'>('tool');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [guideContent, setGuideContent] = useState('');
  const [faqContent, setFaqContent] = useState('');

  useEffect(() => {
    // Load guide and FAQ markdown content on initial mount
    loadMarkdown('/docs/tools/color-converter/guide.md').then(setGuideContent);
    loadMarkdown('/docs/tools/color-converter/faq.md').then(setFaqContent);
  }, []);

  const convertColor = () => {
    try {
      // Remove any whitespace and convert to lowercase
      const cleanInput = input.trim().toLowerCase();
      
      // Check if input is a valid hex color
      if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/.test(cleanInput)) {
        const hex = cleanInput.startsWith('#') ? cleanInput : `#${cleanInput}`;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        setOutput(`HEX: ${hex}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: ${rgbToHsl(r, g, b)}`);
      } else {
        setOutput('Invalid color format. Please enter a valid hex color (e.g., #ff0000 or f00)');
      }
    } catch (error) {
      setOutput('Error converting color. Please check the input format.');
    }
  };

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  return (
    <>
      <SEO
        title="Color Converter"
        description="Convert colors between HEX, RGB, and HSL formats. Fast, secure, and easy to use."
        keywords="color converter, hex, rgb, hsl, color tool"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Color Converter"
        description="Convert colors between HEX, RGB, and HSL formats. Fast, secure, and easy to use."
        url="https://toolzilla.app/color-converter"
      />
      <Container>
        <Title>Color Converter</Title>
        <Description>
          Convert colors between HEX, RGB, and HSL formats with this easy-to-use tool.
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
              placeholder="Enter hex color (e.g., #ff0000 or f00)..."
            />
            <Button onClick={convertColor}>Convert Color</Button>
            {output && (
              <OutputArea
                value={output}
                readOnly
                placeholder="Converted color will appear here..."
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

export default ColorConverter; 