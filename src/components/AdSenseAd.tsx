import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const AdContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin: 2rem 0;
  overflow: hidden;
  position: relative;
`;

const AdLabel = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.7;
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
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style,
  position = 'bottom'
}) => {
  const [adError, setAdError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // List of paths where ads should not be shown
  const noAdPaths = ['/', '/loading', '/error'];

  // Check if the current page has enough quality content
  const hasEnoughContent = () => {
    const mainContent = document.querySelector('main');
    if (!mainContent) return false;
    
    // Get all text content
    const textContent = mainContent.textContent || '';
    
    // Check for minimum content length (at least 1500 characters)
    if (textContent.length < 1500) return false;
    
    // Check for minimum number of paragraphs (at least 5)
    const paragraphs = mainContent.getElementsByTagName('p');
    if (paragraphs.length < 5) return false;
    
    // Check for minimum number of headings (at least 2)
    const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) return false;
    
    return true;
  };

  // Check if we've exceeded the maximum number of ads on the page
  const hasExceededAdLimit = () => {
    const adElements = document.querySelectorAll('.adsbygoogle');
    return adElements.length >= 3; // Maximum 3 ads per page
  };

  // Function to refresh the ad
  const refreshAd = () => {
    if (adRef.current) {
      setIsRefreshing(true);
      try {
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error('AdSense refresh error:', error);
        setAdError(true);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

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

    // Set up refresh interval (every 5 minutes)
    const refreshInterval = setInterval(refreshAd, 5 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [location.pathname]); // Refresh ad when path changes

  // Don't show ads on development, empty pages, or pages with insufficient content
  if (
    process.env.NODE_ENV !== 'production' ||
    noAdPaths.includes(location.pathname) ||
    !hasEnoughContent() ||
    hasExceededAdLimit() ||
    isRefreshing
  ) {
    return null;
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
    <AdContainer style={style} ref={adRef}>
      <AdLabel>Advertisement</AdLabel>
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
        data-adtest={process.env.NODE_ENV !== 'production' ? 'on' : 'off'}
      />
    </AdContainer>
  );
};

export default AdSenseAd;