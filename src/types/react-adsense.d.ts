declare module 'react-adsense' {
    import React from 'react';
  
    interface AdSenseProps {
      client?: string;
      slot?: string;
      style?: React.CSSProperties;
      format?: string;
      layout?: string;
      layoutKey?: string;
      responsive?: string;
      width?: number | string;
      height?: number | string;
    }
  
    const AdSense: React.ComponentType<AdSenseProps>;
    export default AdSense;
  }