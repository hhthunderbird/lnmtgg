import React, { useEffect } from 'react';
import styled from 'styled-components';

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  debug?: boolean;
}

const AdContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  background: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 4px;
`;

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  debug = false
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <AdContainer>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100px',
          backgroundColor: debug ? '#f0f0f0' : 'transparent',
          border: debug ? '1px solid #ccc' : 'none'
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