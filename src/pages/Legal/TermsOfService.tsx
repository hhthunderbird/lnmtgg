import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a73e8;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #202124;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  margin-bottom: 1rem;
  color: #5f6368;
`;

const List = styled.ul`
  margin-bottom: 1rem;
  padding-left: 2rem;
  color: #5f6368;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const TermsOfService: React.FC = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      
      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Text>
          By accessing and using Toolzilla.app, you accept and agree to be bound by the terms and provision of this agreement.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Description of Service</SectionTitle>
        <Text>
          Toolzilla.app provides various online tools and utilities. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. User Responsibilities</SectionTitle>
        <Text>
          As a user of Toolzilla.app, you agree to:
        </Text>
        <List>
          <ListItem>Use the service in compliance with all applicable laws</ListItem>
          <ListItem>Not use the service for any illegal purposes</ListItem>
          <ListItem>Not attempt to gain unauthorized access to any part of the service</ListItem>
          <ListItem>Not interfere with the proper working of the service</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Intellectual Property</SectionTitle>
        <Text>
          All content, features, and functionality of Toolzilla.app are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Limitation of Liability</SectionTitle>
        <Text>
          Toolzilla.app is provided "as is" without any warranties, expressed or implied. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Changes to Terms</SectionTitle>
        <Text>
          We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page.
        </Text>
      </Section>

      <Section>
        <SectionTitle>7. Contact Information</SectionTitle>
        <Text>
          If you have any questions about these Terms of Service, please contact us at:
          <br />
          Email: legal@toolzilla.app
        </Text>
      </Section>
    </Container>
  );
};

export default TermsOfService; 