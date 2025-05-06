import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1a73e8;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: #5f6368;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <LogoImage src="/logo.svg" alt="Toolzilla Logo" />
            <Title>
              <MainTitle>Toolzilla</MainTitle>
              <Subtitle>Every tool you need, in one place</Subtitle>
            </Title>
          </Logo>
        </Link>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 