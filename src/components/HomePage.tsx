import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SEO from './SEO';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--primary-color, #1a73e8);
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary, #5f6368);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const WelcomeSection = styled.div`
  background: var(--card-bg, #f8f9fa);
  border: 1px solid var(--border-color, #e8eaed);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  font-size: 2rem;
  color: var(--text-primary, #202124);
  margin-bottom: 1rem;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary, #5f6368);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color, #1a73e8);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover, #1557b0);
  }
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <SEO
        title="Toolzilla - Free Online Developer Tools"
        description="Free online developer tools for developers and professionals."
        keywords="developer tools, online tools, web tools"
      />
      
      <Title>🚀 Welcome to Toolzilla</Title>
      <Description>
        Your one-stop destination for powerful online developer tools and utilities.
        Build, create, and innovate with our collection of free tools.
      </Description>

      <WelcomeSection>
        <WelcomeTitle>🎯 What We Offer</WelcomeTitle>
        <WelcomeText>
          We're building a comprehensive suite of developer tools to help you work more efficiently.
          From code formatters to calculators, we've got you covered.
        </WelcomeText>
        <WelcomeText>
          Stay tuned as we add more tools to make your development workflow smoother and faster.
        </WelcomeText>
        <ButtonGroup>
          <StyledLink to="/automate">
            🚀 Try Our Rich Text Editor
          </StyledLink>
        </ButtonGroup>
      </WelcomeSection>
    </Container>
  );
};

export default HomePage; 