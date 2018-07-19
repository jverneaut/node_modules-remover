import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  height: 40px;
  -webkit-app-region:drag;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 14px;
  user-select: none;
`;

const Title = styled.h1`
  
`;

const TitleBar = () => (
  <Background>
    <Title>node_modules remover</Title>
  </Background>
)

export default TitleBar;
