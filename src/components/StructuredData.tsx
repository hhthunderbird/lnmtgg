import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebSite' | 'WebPage' | 'SoftwareApplication';
  name: string;
  description: string;
  url: string;
  potentialAction?: {
    '@type': string;
    target: string;
  };
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name,
  description,
  url,
  potentialAction,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...(potentialAction && { potentialAction }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData; 