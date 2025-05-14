import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a73e8;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #202124;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #1557b0;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #e6f4ea;
  color: #137333;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: #fce8e6;
  color: #ea4335;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Container>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>

        {status === 'success' && (
          <SuccessMessage>
            Thank you for your message! We'll get back to you soon.
          </SuccessMessage>
        )}

        {status === 'error' && (
          <ErrorMessage>
            Sorry, there was an error sending your message. Please try again.
          </ErrorMessage>
        )}
      </Form>
    </Container>
  );
};

export default Contact; 