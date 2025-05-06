import React, { useEffect } from 'react';

interface AdSenseAdProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  adStyle?: React.CSSProperties;
  fullWidthResponsive?: boolean;
  layoutKey?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adClient,
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  fullWidthResponsive = true,
  layoutKey,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="ad-container" key={adSlot}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  );
};

export default AdSenseAd;