import React from 'react';
import DocumentationSection from '../documentation/DocumentationSection';

const UrlEncoderDocs: React.FC = () => {
  const documentation = {
    toolName: 'URL Encoder',
    whatIs: {
      title: 'What is URL Encoding?',
      description: 'URL encoding (also known as percent-encoding) is a method to encode special characters in URLs to ensure they are transmitted correctly over the internet. It converts characters that are not allowed in URLs into a format that can be safely transmitted.',
      keyPoints: [
        'Converts special characters into percent-encoded format',
        'Ensures URLs are properly formatted for web transmission',
        'Handles international characters and spaces',
        'Essential for web development and API calls',
        'Prevents URL parsing errors and security issues'
      ]
    },
    useCases: {
      title: 'Common Use Cases',
      useCases: [
        {
          title: 'Web Development',
          description: 'Encode URLs with special characters or parameters for web applications.'
        },
        {
          title: 'API Integration',
          description: 'Properly format URLs for API requests with query parameters.'
        },
        {
          title: 'Form Submissions',
          description: 'Encode form data before sending it to the server.'
        },
        {
          title: 'International URLs',
          description: 'Handle URLs containing non-ASCII characters or spaces.'
        }
      ]
    },
    bestPractices: {
      title: 'Best Practices for URL Encoding',
      practices: [
        'Always encode special characters in URLs',
        'Use UTF-8 encoding for international characters',
        'Encode spaces as %20 or +',
        'Handle query parameters properly',
        'Be aware of URL length limitations',
        'Consider security implications of encoded data',
        'Test encoded URLs across different browsers',
        'Follow RFC 3986 standards for URL encoding'
      ]
    },
    examples: {
      title: 'URL Encoding Examples',
      examples: [
        {
          title: 'Basic URL Encoding',
          description: 'Encoding a URL with special characters:',
          code: `// Original URL: https://example.com/path with spaces/file.html
// Encoded URL: https://example.com/path%20with%20spaces/file.html`
        },
        {
          title: 'Query Parameters',
          description: 'Encoding URL with query parameters:',
          code: `// Original URL: https://api.example.com/search?q=hello world&lang=fr
// Encoded URL: https://api.example.com/search?q=hello%20world&lang=fr`
        }
      ]
    },
    faqs: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What characters need to be URL encoded?',
          answer: 'Characters that need encoding include spaces, special characters (!@#$%^&*), and non-ASCII characters. Only alphanumeric characters (A-Z, a-z, 0-9) and a few special characters (-_.~) can be used without encoding.'
        },
        {
          question: 'What is the difference between URL encoding and HTML encoding?',
          answer: 'URL encoding uses percent-encoding (%xx) for special characters, while HTML encoding uses character entities (&xx;). They serve different purposes and should not be used interchangeably.'
        },
        {
          question: 'Should I encode the entire URL?',
          answer: 'No, you should only encode the parts of the URL that contain special characters. The protocol (http://), domain name, and path separators (/) should not be encoded.'
        },
        {
          question: 'How do I handle international characters in URLs?',
          answer: 'International characters should be encoded using UTF-8 and then percent-encoded. For example, "é" becomes "%C3%A9" in a URL.'
        }
      ]
    }
  };

  return <DocumentationSection {...documentation} />;
};

export default UrlEncoderDocs; 