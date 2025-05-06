import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import AdSpace from './AdSpace';
import LoanCalculator from './LoanCalculator';
import JsonFormatter from './JsonFormatter';
import Base64Converter from './Base64Converter';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const SearchResultItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const ToolsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToolCard = styled.div<{ isExpanded: boolean }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ToolHeader = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  background: ${props => props.isExpanded ? '#f8f9fa' : 'white'};
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

const ToolTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

const ToolDescription = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const ToolContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => props.isExpanded ? '1.5rem' : '0 1.5rem'};
  border-top: ${props => props.isExpanded ? '1px solid #eee' : 'none'};
`;

// Placeholder components for tools that haven't been implemented yet
const PlaceholderTool = () => (
  <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
    This tool is coming soon!
  </div>
);

const tools = [
  {
    id: 'loan-calculator',
    title: 'Loan & Mortgage Calculator',
    description: 'Calculate your loan payments, interest rates, and amortization schedule.',
    component: LoanCalculator
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify your JSON data with syntax highlighting.',
    component: JsonFormatter
  },
  {
    id: 'base64',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode or decode Base64 strings, images, and files.',
    component: Base64Converter
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs with support for special characters.',
    component: PlaceholderTool
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and other formats.',
    component: PlaceholderTool
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between different units of measurement (length, weight, temperature).',
    component: PlaceholderTool
  },
  {
    id: 'regex-tester',
    title: 'Regular Expression Tester',
    description: 'Test and debug regular expressions with real-time matching.',
    component: PlaceholderTool
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hash values.',
    component: PlaceholderTool
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs (v1, v4) for your applications.',
    component: PlaceholderTool
  },
  {
    id: 'ip-lookup',
    title: 'IP Address Lookup',
    description: 'Get detailed information about any IP address.',
    component: PlaceholderTool
  },
  {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    description: 'Write and preview Markdown with live rendering.',
    component: PlaceholderTool
  },
  {
    id: 'code-minifier',
    title: 'Code Minifier',
    description: 'Minify JavaScript, CSS, and HTML code.',
    component: PlaceholderTool
  }
];

function HomePage() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof tools>([]);
  const [showResults, setShowResults] = useState(false);

  const fuse = new Fuse(tools, {
    keys: ['title', 'description'],
    threshold: 0.3,
    includeScore: true
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = fuse.search(searchQuery).map(result => result.item);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearchSelect = (toolId: string) => {
    setExpandedTool(toolId);
    setSearchQuery('');
    setShowResults(false);
  };

  const toggleTool = (toolId: string) => {
    setExpandedTool(expandedTool === toolId ? null : toolId);
  };

  return (
    <HomeContainer>
      <h1>Developer Tools</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search for a tool..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
        />
        {showResults && searchResults.length > 0 && (
          <SearchResults>
            {searchResults.map((tool) => (
              <SearchResultItem
                key={tool.id}
                onClick={() => handleSearchSelect(tool.id)}
              >
                <ToolTitle>{tool.title}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </SearchContainer>
      <ToolsList>
        {tools.map((tool) => (
          <ToolCard key={tool.id} isExpanded={expandedTool === tool.id}>
            <ToolHeader 
              isExpanded={expandedTool === tool.id}
              onClick={() => toggleTool(tool.id)}
            >
              <ToolTitle>{tool.title}</ToolTitle>
            </ToolHeader>
            <ToolContent isExpanded={expandedTool === tool.id}>
              <ToolDescription>{tool.description}</ToolDescription>
              <div style={{ marginTop: '1rem' }}>
                <tool.component />
              </div>
            </ToolContent>
          </ToolCard>
        ))}
      </ToolsList>
      <AdSpace />
    </HomeContainer>
  );
}

export default HomePage; 