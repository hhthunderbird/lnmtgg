import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import config from '../config';

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
    if (!config.adsense.enabled) return;

    try {
      // @ts-ignore
      if (window.adsbygoogle) {
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

  // Don't render ads in development or on empty pages
  if (!config.adsense.enabled || !location.pathname) {
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
        data-adtest={config.app.env === 'development' ? 'on' : 'off'}
        data-ad-region="auto"
      />
    </AdContainer>
  );
};

export default AdSenseAd;