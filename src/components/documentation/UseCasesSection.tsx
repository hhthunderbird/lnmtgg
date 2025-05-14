import React from 'react';
import styled from 'styled-components';

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

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const UseCaseCard = styled.div`
  background: var(--background-primary);
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
`;

const UseCaseTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const UseCaseDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
`;

interface UseCase {
  title: string;
  description: string;
}

interface UseCasesSectionProps {
  title: string;
  useCases: UseCase[];
}

const UseCasesSection: React.FC<UseCasesSectionProps> = ({
  title,
  useCases
}) => {
  return (
    <Section>
      <Title>{title}</Title>
      <UseCaseGrid>
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index}>
            <UseCaseTitle>{useCase.title}</UseCaseTitle>
            <UseCaseDescription>{useCase.description}</UseCaseDescription>
          </UseCaseCard>
        ))}
      </UseCaseGrid>
    </Section>
  );
};

export default UseCasesSection; 