import React from 'react';
import styled from 'styled-components';
import AdSenseAd from './AdSenseAd';
import config from '../config';

const LateralContainer = styled.div<{ position: 'left' | 'right' }>`
  position: relative;
  width: 160px;
  height: 600px;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 0 1rem;

  @media (max-width: 1600px) {
    display: none;
  }

  @media (min-width: 1601px) and (max-width: 1800px) {
    width: 120px;
    height: 400px;
  }
`;

interface LateralAdSpaceProps {
  position: 'left' | 'right';
}

const LateralAdSpace: React.FC<LateralAdSpaceProps> = ({ position }) => {
  return (
    <LateralContainer position={position}>
      <AdSenseAd
        client={config.adsense.client}
        slot={config.adsense.slot}
        format="vertical"
        responsive={false}
        position={position}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '160px',
          maxHeight: '600px'
        }}
      />
    </LateralContainer>
  );
};

export default LateralAdSpace; 