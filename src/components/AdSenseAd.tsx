import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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
  position: relative;
`;

const AdSenseAd: React.FC<AdSenseAdProps> = ({ client, slot, format = 'auto', responsive = true }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: client,
          enable_page_level_ads: true,
          overlays: { bottom: true }
        });
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [client, location.pathname]);

  // Only render ads when there is content on the page
  if (!location.pathname) {
    return null;
  }

  return (
    <AdContainer ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
        data-ad-region="auto"
      />
    </AdContainer>
  );
};

export default AdSenseAd;