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

const Content = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-top: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

interface WhatIsSectionProps {
  title: string;
  description: string;
  keyPoints: string[];
}

const WhatIsSection: React.FC<WhatIsSectionProps> = ({
  title,
  description,
  keyPoints
}) => {
  return (
    <Section>
      <Title>{title}</Title>
      <Content>
        <p>{description}</p>
        <List>
          {keyPoints.map((point, index) => (
            <ListItem key={index}>{point}</ListItem>
          ))}
        </List>
      </Content>
    </Section>
  );
};

export default WhatIsSection; 