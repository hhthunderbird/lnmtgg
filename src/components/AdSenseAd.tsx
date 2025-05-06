import React, { useEffect, useState } from 'react';
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

const DebugInfo = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1001;
`;

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  debug?: boolean;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  debug = false,
}) => {
  const [adStatus, setAdStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAd = async () => {
      try {
        // Check if adsbygoogle is defined
        if (typeof window.adsbygoogle === 'undefined') {
          setError('AdSense script not loaded');
          setAdStatus('Error: AdSense script not loaded');
          return;
        }

        // Push the ad
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdStatus('Ad pushed successfully');
        
        // Add event listener for ad load
        const adElement = document.querySelector('.adsbygoogle');
        if (adElement) {
          adElement.addEventListener('load', () => {
            setAdStatus('Ad loaded successfully');
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setAdStatus(`Error: ${errorMessage}`);
        console.error('Error loading AdSense:', err);
      }
    };

    loadAd();
  }, [client, slot]);

  return (
    <>
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
      {debug && (
        <DebugInfo>
          <div>Status: {adStatus}</div>
          {error && <div>Error: {error}</div>}
          <div>Client: {client}</div>
          <div>Slot: {slot}</div>
        </DebugInfo>
      )}
    </>
  );
};

export default AdSenseAd;