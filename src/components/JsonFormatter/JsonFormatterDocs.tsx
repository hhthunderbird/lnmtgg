import React from 'react';
import DocumentationSection from '../documentation/DocumentationSection';

const JsonFormatterDocs: React.FC = () => {
  const documentation = {
    toolName: 'JSON Formatter',
    whatIs: {
      title: 'What is a JSON Formatter?',
      description: 'A JSON Formatter is an essential tool for developers that helps format, validate, and beautify JSON (JavaScript Object Notation) data. It makes JSON data more readable by adding proper indentation, line breaks, and syntax highlighting.',
      keyPoints: [
        'Makes JSON data human-readable with proper formatting and indentation',
        'Validates JSON syntax and helps identify errors',
        'Supports both formatting and minifying JSON data',
        'Essential for API development and debugging',
        'Helps in learning and understanding JSON structure'
      ]
    },
    useCases: {
      title: 'Common Use Cases',
      useCases: [
        {
          title: 'API Development and Testing',
          description: 'Format and validate JSON responses from APIs to ensure data integrity and proper structure.'
        },
        {
          title: 'Debugging JSON Data',
          description: 'Quickly identify syntax errors and structural issues in JSON data.'
        },
        {
          title: 'Learning JSON Structure',
          description: 'Understand how JSON objects and arrays are structured through formatted examples.'
        },
        {
          title: 'Data Exchange',
          description: 'Format JSON data for sharing with team members or integrating with other systems.'
        }
      ]
    },
    bestPractices: {
      title: 'Best Practices for Working with JSON',
      practices: [
        'Always validate JSON data before processing it',
        'Use proper indentation for better readability',
        'Keep JSON keys short but descriptive',
        'Use consistent naming conventions',
        'Avoid deeply nested structures when possible',
        'Include proper error handling for JSON parsing',
        'Use appropriate data types for values',
        'Consider using JSON Schema for validation'
      ]
    },
    examples: {
      title: 'JSON Examples',
      examples: [
        {
          title: 'Basic JSON Object',
          description: 'A simple JSON object with different data types:',
          code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "coding", "gaming"]
}`
        },
        {
          title: 'JSON Array',
          description: 'An array of JSON objects:',
          code: `[
  {
    "id": 1,
    "product": "Laptop",
    "price": 999.99
  },
  {
    "id": 2,
    "product": "Smartphone",
    "price": 699.99
  }
]`
        }
      ]
    },
    faqs: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What is JSON?',
          answer: 'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of JavaScript syntax.'
        },
        {
          question: 'Why should I format JSON?',
          answer: 'Formatting JSON makes it more readable and easier to debug. It helps identify syntax errors and structural issues quickly.'
        },
        {
          question: 'What are common JSON errors?',
          answer: 'Common JSON errors include missing commas, unquoted keys, trailing commas, and mismatched brackets or braces.'
        },
        {
          question: 'How do I validate JSON?',
          answer: 'You can validate JSON using this tool, which will check for syntax errors and proper structure. For more complex validation, consider using JSON Schema.'
        }
      ]
    }
  };

  return <DocumentationSection {...documentation} />;
};

export default JsonFormatterDocs; 