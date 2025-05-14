import React from 'react';
import DocumentationSection from '../documentation/DocumentationSection';

const Base64ConverterDocs: React.FC = () => {
  const documentation = {
    toolName: 'Base64 Converter',
    whatIs: {
      title: 'What is Base64 Encoding?',
      description: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used to encode binary data, such as images or files, into a text format that can be safely transmitted over text-based protocols.',
      keyPoints: [
        'Converts binary data into a text format using 64 characters (A-Z, a-z, 0-9, +, /)',
        'Widely used for encoding attachments in email',
        'Common in web development for embedding images and files',
        'Helps transmit binary data over text-based protocols',
        'Used in data URLs and API responses'
      ]
    },
    useCases: {
      title: 'Common Use Cases',
      useCases: [
        {
          title: 'Email Attachments',
          description: 'Encode binary files (images, documents) for email transmission.'
        },
        {
          title: 'Web Development',
          description: 'Embed images and files directly in HTML/CSS using data URLs.'
        },
        {
          title: 'API Development',
          description: 'Send binary data in JSON responses or API requests.'
        },
        {
          title: 'File Storage',
          description: 'Store binary files in text-based storage systems.'
        }
      ]
    },
    bestPractices: {
      title: 'Best Practices for Base64',
      practices: [
        'Use Base64 only when necessary (it increases data size by ~33%)',
        'Consider using binary formats for large files',
        'Be aware of line length limitations in some systems',
        'Handle padding characters (=) correctly',
        'Use appropriate character encoding (UTF-8 for text)',
        'Consider security implications when encoding sensitive data',
        'Validate input before encoding/decoding',
        'Handle errors gracefully during conversion'
      ]
    },
    examples: {
      title: 'Base64 Examples',
      examples: [
        {
          title: 'Text Encoding',
          description: 'Encoding a simple text string:',
          code: `// Original text: "Hello, World!"
// Base64 encoded: SGVsbG8sIFdvcmxkIQ==`
        },
        {
          title: 'Image Encoding',
          description: 'Encoding a small image (1x1 pixel):',
          code: `// Original: 1x1 pixel PNG
// Base64 encoded: iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==`
        }
      ]
    },
    faqs: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What is Base64 used for?',
          answer: 'Base64 is primarily used to encode binary data into a text format that can be safely transmitted over text-based protocols like HTTP, SMTP, or stored in text-based formats like JSON or XML.'
        },
        {
          question: 'Why does Base64 increase file size?',
          answer: 'Base64 encoding increases file size by approximately 33% because it uses 6 bits to represent each byte of data, and the resulting output is padded to ensure it\'s divisible by 4.'
        },
        {
          question: 'Is Base64 encryption?',
          answer: 'No, Base64 is not encryption. It is an encoding scheme that can be easily decoded. It should not be used to secure sensitive data.'
        },
        {
          question: 'What are the Base64 characters?',
          answer: 'Base64 uses 64 characters: A-Z, a-z, 0-9, +, and /. The = character is used for padding.'
        }
      ]
    }
  };

  return <DocumentationSection {...documentation} />;
};

export default Base64ConverterDocs; 