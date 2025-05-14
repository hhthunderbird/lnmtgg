import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AdContainer = styled.div<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${({ position }) => {
    switch (position) {
      case 'top':
        return '2rem 0 3rem 0';
      case 'bottom':
        return '3rem 0 2rem 0';
      case 'left':
      case 'right':
        return '2rem 0';
      default:
        return '2rem 0';
    }
  }};
  padding: 1rem;
  background: transparent;
  border-radius: 8px;
  position: relative;

  /* Ensure minimum spacing between ads */
  & + & {
    margin-top: 150px;
  }

  /* Ensure minimum spacing from navigation */
  ${({ position }) => {
    switch (position) {
      case 'left':
        return 'margin-right: 150px;';
      case 'right':
        return 'margin-left: 150px;';
      default:
        return '';
    }
  }}
`;

const AdLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  background: var(--error-bg);
  border-radius: 4px;
  margin: 0.5rem 0;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem 0;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface AdSenseAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  position,
  style
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const adRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Function to handle ad load errors
  const handleAdError = (error: Error) => {
    console.error('AdSense error:', error);
    setError('Failed to load advertisement. Please try refreshing the page.');
    setIsLoading(false);
  };

  // Function to handle successful ad load
  const handleAdLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  // Function to refresh the ad
  const refreshAd = () => {
    if (adRef.current) {
      // Clear existing ad
      adRef.current.innerHTML = '';
      setIsLoading(true);
      setError(null);
      setRefreshCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.onerror = () => handleAdError(new Error('Failed to load AdSense script'));
      document.head.appendChild(script);
    }

    // Initialize ad
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      handleAdError(error as Error);
    }

    // Set up refresh interval (every 5 minutes)
    timeoutRef.current = setInterval(refreshAd, 5 * 60 * 1000);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [refreshCount]);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshAd();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <AdContainer position={position} style={style}>
      <AdLabel>Advertisement</AdLabel>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
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