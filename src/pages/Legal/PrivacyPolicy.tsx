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

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <Title>Privacy Policy</Title>
      
      <Section>
        <SectionTitle>1. Information We Collect</SectionTitle>
        <Text>
          At Toolzilla.app, we collect information to provide better services to our users. The types of information we collect include:
        </Text>
        <List>
          <ListItem>Information you provide to us (such as when you use our tools)</ListItem>
          <ListItem>Information we get from your use of our services</ListItem>
          <ListItem>Device and usage information</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. How We Use Information</SectionTitle>
        <Text>
          We use the information we collect to:
        </Text>
        <List>
          <ListItem>Provide, maintain, and improve our services</ListItem>
          <ListItem>Develop new tools and features</ListItem>
          <ListItem>Understand how users interact with our services</ListItem>
          <ListItem>Protect Toolzilla.app and our users</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. Information Security</SectionTitle>
        <Text>
          We work hard to protect Toolzilla.app and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular:
        </Text>
        <List>
          <ListItem>We encrypt our services using SSL</ListItem>
          <ListItem>We review our information collection, storage, and processing practices</ListItem>
          <ListItem>We restrict access to personal information</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Your Rights</SectionTitle>
        <Text>
          You have the right to:
        </Text>
        <List>
          <ListItem>Access your personal information</ListItem>
          <ListItem>Correct inaccurate data</ListItem>
          <ListItem>Request deletion of your data</ListItem>
          <ListItem>Object to our use of your data</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Contact Us</SectionTitle>
        <Text>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@toolzilla.app
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Changes to This Policy</SectionTitle>
        <Text>
          We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
        </Text>
      </Section>
    </Container>
  );
};

export default PrivacyPolicy; 