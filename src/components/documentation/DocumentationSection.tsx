import React from 'react';
import styled from 'styled-components';
import WhatIsSection from './WhatIsSection';
import UseCasesSection from './UseCasesSection';

const DocumentationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--background-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const CodeBlock = styled.pre`
  background: var(--background-primary);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--border-color);
`;

const Code = styled.code`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
`;

interface DocumentationSectionProps {
  toolName: string;
  whatIs: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  useCases: {
    title: string;
    useCases: Array<{
      title: string;
      description: string;
    }>;
  };
  bestPractices: {
    title: string;
    practices: string[];
  };
  examples: {
    title: string;
    examples: Array<{
      title: string;
      description: string;
      code: string;
    }>;
  };
  faqs: {
    title: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({
  toolName,
  whatIs,
  useCases,
  bestPractices,
  examples,
  faqs
}) => {
  return (
    <DocumentationContainer>
      <WhatIsSection
        title={whatIs.title}
        description={whatIs.description}
        keyPoints={whatIs.keyPoints}
      />

      <UseCasesSection
        title={useCases.title}
        useCases={useCases.useCases}
      />

      <Section>
        <Title>{bestPractices.title}</Title>
        <Content>
          <ul>
            {bestPractices.practices.map((practice, index) => (
              <li key={index}>{practice}</li>
            ))}
          </ul>
        </Content>
      </Section>

      <Section>
        <Title>{examples.title}</Title>
        {examples.examples.map((example, index) => (
          <div key={index}>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <CodeBlock>
              <Code>{example.code}</Code>
            </CodeBlock>
          </div>
        ))}
      </Section>

      <Section>
        <Title>{faqs.title}</Title>
        {faqs.questions.map((faq, index) => (
          <div key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </Section>
    </DocumentationContainer>
  );
};

export default DocumentationSection; 