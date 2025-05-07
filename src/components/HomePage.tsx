import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a73e8;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a73e8;
  margin-bottom: 1.5rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ToolCard = styled(Link)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ToolTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a73e8;
`;

const ToolDescription = styled.p`
  color: #5f6368;
  margin: 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const CategoryCard = styled(Link)`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e8f0fe;
  }
`;

const CategoryName = styled.h4`
  font-size: 1.1rem;
  color: #1a73e8;
  margin: 0;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #5f6368;
  margin: 0.5rem 0 0;
`;

const AccordionSection = styled.section`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
`;

const AccordionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a73e8;
  margin-bottom: 1.5rem;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AccordionHeader = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.isOpen ? '#e8f0fe' : 'white'};
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e8f0fe;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '1rem 1.5rem' : '0 1.5rem'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const AccordionIcon = styled.span<{ isOpen: boolean }>`
  transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
  transition: transform 0.3s ease;
`;

interface Tool {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const tools: Tool[] = [
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate and beautify your JSON data with syntax highlighting.',
    path: '/json-formatter',
    category: 'Development',
    isPopular: true
  },
  {
    id: 'base64-converter',
    title: 'Base64 Converter',
    description: 'Convert text to Base64 and decode Base64 to text. Fast and secure.',
    path: '/base64-converter',
    category: 'Development',
    isPopular: true
  },
  {
    id: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and total payment for loans.',
    path: '/loan-calculator',
    category: 'Finance',
    isNew: true
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs with support for special characters.',
    path: '/url-encoder',
    category: 'Development',
    isPopular: true
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL, and other color formats.',
    path: '/color-converter',
    category: 'Design',
    isNew: true
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and other hash values.',
    path: '/hash-generator',
    category: 'Security',
    isPopular: true
  }
];

const categories = [
  {
    id: 'development',
    name: 'Development Tools',
    description: 'Tools for developers including formatters, converters, and validators.',
    tools: tools.filter(tool => tool.category === 'Development')
  },
  {
    id: 'finance',
    name: 'Finance Tools',
    description: 'Calculators and tools for financial planning and analysis.',
    tools: tools.filter(tool => tool.category === 'Finance')
  },
  {
    id: 'design',
    name: 'Design Tools',
    description: 'Tools for designers including color converters and visual utilities.',
    tools: tools.filter(tool => tool.category === 'Design')
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Tools for security and encryption including hash generators.',
    tools: tools.filter(tool => tool.category === 'Security')
  }
];

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openAllTools, setOpenAllTools] = useState<string | null>(null);

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularTools = tools.filter(tool => tool.isPopular);
  const newTools = tools.filter(tool => tool.isNew);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const toggleAllTools = (id: string) => {
    setOpenAllTools(openAllTools === id ? null : id);
  };

  return (
    <Container>
      <SEO
        title="Toolzilla - Free Online Tools"
        description="Free online tools including JSON Formatter, Base64 Converter, Loan Calculator, URL Encoder, Color Converter, and more. Fast, secure, and easy to use."
        keywords="online tools, json formatter, base64 converter, loan calculator, url encoder, color converter, hash generator"
      />
      <Title>Toolzilla</Title>
      <Description>
        Welcome to Toolzilla, your one-stop destination for free online tools. Whether you're a developer, designer, or just need some quick utilities, we've got you covered. Our collection includes powerful tools for development, finance, design, and security - all free to use, no registration required. Browse our categories, try our popular tools, or use the search to find exactly what you need.
      </Description>
      
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      {searchQuery ? (
        <Section>
          <SectionTitle>Search Results</SectionTitle>
          <ToolsGrid>
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} to={tool.path}>
                <ToolTitle>{tool.title}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
              </ToolCard>
            ))}
          </ToolsGrid>
        </Section>
      ) : (
        <>
          <Section>
            <SectionTitle>Popular Tools</SectionTitle>
            <ToolsGrid>
              {popularTools.map(tool => (
                <ToolCard key={tool.id} to={tool.path}>
                  <ToolTitle>{tool.title}</ToolTitle>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolCard>
              ))}
            </ToolsGrid>
          </Section>

          <Section>
            <SectionTitle>New Tools</SectionTitle>
            <ToolsGrid>
              {newTools.map(tool => (
                <ToolCard key={tool.id} to={tool.path}>
                  <ToolTitle>{tool.title}</ToolTitle>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolCard>
              ))}
            </ToolsGrid>
          </Section>

          <Section>
            <SectionTitle>Tool Categories</SectionTitle>
            <CategoryGrid>
              {categories.map(category => (
                <CategoryCard key={category.id} to={`/category/${category.id}`}>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>{category.description}</CategoryDescription>
                </CategoryCard>
              ))}
            </CategoryGrid>
          </Section>

          <AccordionSection>
            <AccordionTitle>All Tools</AccordionTitle>
            <AccordionContainer>
              {categories.map(category => (
                <AccordionItem key={category.id}>
                  <AccordionHeader
                    isOpen={openAccordion === category.id}
                    onClick={() => toggleAccordion(category.id)}
                  >
                    <CategoryName>{category.name}</CategoryName>
                    <AccordionIcon isOpen={openAccordion === category.id}>▼</AccordionIcon>
                  </AccordionHeader>
                  <AccordionContent isOpen={openAccordion === category.id}>
                    <ToolsGrid>
                      {category.tools.map(tool => (
                        <ToolCard key={tool.id} to={tool.path}>
                          <ToolTitle>{tool.title}</ToolTitle>
                          <ToolDescription>{tool.description}</ToolDescription>
                        </ToolCard>
                      ))}
                    </ToolsGrid>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionContainer>
          </AccordionSection>

          <AccordionSection>
            <AccordionTitle>All Tools (Flat List)</AccordionTitle>
            <AccordionContainer>
              <AccordionItem>
                <AccordionHeader
                  isOpen={openAllTools === 'all'}
                  onClick={() => toggleAllTools('all')}
                >
                  <CategoryName>View All Tools</CategoryName>
                  <AccordionIcon isOpen={openAllTools === 'all'}>▼</AccordionIcon>
                </AccordionHeader>
                <AccordionContent isOpen={openAllTools === 'all'}>
                  <ToolsGrid>
                    {tools.map(tool => (
                      <ToolCard key={tool.id} to={tool.path}>
                        <ToolTitle>{tool.title}</ToolTitle>
                        <ToolDescription>{tool.description}</ToolDescription>
                      </ToolCard>
                    ))}
                  </ToolsGrid>
                </AccordionContent>
              </AccordionItem>
            </AccordionContainer>
          </AccordionSection>
        </>
      )}
    </Container>
  );
};

export default HomePage; 