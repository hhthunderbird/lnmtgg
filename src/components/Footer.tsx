import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #5f6368;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterLink = styled(Link)`
  color: #5f6368;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #1a73e8;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Toolzilla.app. All rights reserved.
        </Copyright>
        <FooterLinks>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 