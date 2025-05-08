import React from 'react';
import styled from 'styled-components';
import AdSenseAd from './AdSenseAd';
import config from '../config';

const LateralContainer = styled.div<{ position: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position}: 0;
  width: 160px;
  height: 600px;
  z-index: 90;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  @media (max-width: 1600px) {
    display: none;
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
        style={{
          width: '160px',
          height: '600px'
        }}
      />
    </LateralContainer>
  );
};

export default LateralAdSpace; 