import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

const AdContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin: 1rem 0;
  overflow: hidden;
`;

const AdSenseAd: React.FC<AdSenseAdProps> = ({ client, slot, format = 'auto', responsive = true }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <AdContainer ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-adtest="on"
      />
    </AdContainer>
  );
};

export default AdSenseAd;