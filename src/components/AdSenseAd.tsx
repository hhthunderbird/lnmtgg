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

const DevPlaceholder = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border: 2px dashed #1a73e8;
  border-radius: 8px;
  padding: 1rem;
  color: #1a73e8;
  font-size: 0.9rem;
  text-align: center;
`;

const DevPlaceholderTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DevPlaceholderInfo = styled.div`
  color: #5f6368;
  font-size: 0.8rem;
`;

const ErrorPlaceholder = styled(DevPlaceholder)`
  border-color: #dc3545;
  color: #dc3545;
`;

const AdSenseAd: React.FC<AdSenseAdProps> = ({ client, slot, format = 'auto', responsive = true }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [hasError, setHasError] = React.useState(false);

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
      setHasError(true);
    }
  }, [client, location.pathname]);

  // Don't render ads on empty pages
  if (!location.pathname) {
    return null;
  }

  // Show development placeholder
  if (!config.adsense.enabled) {
    return (
      <DevPlaceholder>
        <DevPlaceholderTitle>AdSense Placeholder</DevPlaceholderTitle>
        <DevPlaceholderInfo>
          Development Mode: Ads are disabled
          <br />
          Client: {client}
          <br />
          Slot: {slot}
        </DevPlaceholderInfo>
      </DevPlaceholder>
    );
  }

  // Show error placeholder if there was an error
  if (hasError) {
    return (
      <ErrorPlaceholder>
        <DevPlaceholderTitle>AdSense Error</DevPlaceholderTitle>
        <DevPlaceholderInfo>
          There was an error loading the ad.
          <br />
          Please try refreshing the page.
        </DevPlaceholderInfo>
      </ErrorPlaceholder>
    );
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