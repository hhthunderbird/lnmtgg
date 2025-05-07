import React from 'react';
import styled from 'styled-components';
import AdSenseAd from './AdSenseAd';
import config from '../config';

const LateralAdContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 160px;
  height: 600px;
  z-index: 100;
  display: none;

  @media (min-width: 1400px) {
    display: block;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
  }
`;

interface LateralAdSpaceProps {
  position: 'left' | 'right';
}

const LateralAdSpace: React.FC<LateralAdSpaceProps> = ({ position }) => {
  return (
    <LateralAdContainer className={position}>
      <AdSenseAd
        client={config.adsense.client}
        slot={config.adsense.slot}
        format="vertical"
        responsive={false}
      />
    </LateralAdContainer>
  );
};

export default LateralAdSpace; 