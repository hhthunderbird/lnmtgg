import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
`;

const DevPlaceholder = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background-secondary);
  border: 2px dashed var(--accent-primary);
  border-radius: 8px;
  padding: 1rem;
  color: var(--accent-primary);
  font-size: 0.9rem;
  text-align: center;
`;

const DevPlaceholderTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DevPlaceholderInfo = styled.div`
  color: var(--text-secondary);
  font-size: 0.8rem;
`;

const ErrorPlaceholder = styled(DevPlaceholder)`
  border-color: var(--error-color);
  color: var(--error-color);
`;

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style
}) => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
      setAdError(true);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <AdContainer style={style}>
        <DevPlaceholder>
          <DevPlaceholderTitle>AdSense Ad</DevPlaceholderTitle>
          <DevPlaceholderInfo>
            Client: {client}<br />
            Slot: {slot}<br />
            Format: {format}<br />
            Responsive: {responsive ? 'Yes' : 'No'}
          </DevPlaceholderInfo>
        </DevPlaceholder>
      </AdContainer>
    );
  }

  if (adError) {
    return (
      <AdContainer style={style}>
        <ErrorPlaceholder>
          <DevPlaceholderTitle>Ad Not Available</DevPlaceholderTitle>
          <DevPlaceholderInfo>
            We're having trouble loading the advertisement.
            Please try refreshing the page.
          </DevPlaceholderInfo>
        </ErrorPlaceholder>
      </AdContainer>
    );
  }

  return (
    <AdContainer style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </AdContainer>
  );
};

export default AdSenseAd;