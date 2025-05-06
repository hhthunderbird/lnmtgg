import React, { useEffect } from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 15px;
  box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  min-height: 90px;
  max-height: 120px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px;
    min-height: 60px;
    max-height: 90px;
  }

  /* Hide on very small screens */
  @media (max-width: 320px) {
    display: none;
  }

  /* Add some space at the bottom of the page to prevent content from being hidden */
  &::after {
    content: '';
    display: block;
    height: 120px;
    @media (max-width: 768px) {
      height: 90px;
    }
  }
`;

const AdWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <AdContainer>
      <AdWrapper>
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%',
            minHeight: '90px'
          }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </AdWrapper>
    </AdContainer>
  );
};

export default AdSenseAd;