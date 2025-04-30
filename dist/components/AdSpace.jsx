import React from 'react';
import styled from 'styled-components';
const AdContainer = styled.div `
  width: 100%;
  height: 250px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px dashed #ccc;
`;
const AdPlaceholder = styled.div `
  color: #666;
  font-size: 0.9rem;
`;
const AdSpace = () => {
    return (<AdContainer>
      <AdPlaceholder>Advertisement Space</AdPlaceholder>
    </AdContainer>);
};
export default AdSpace;
