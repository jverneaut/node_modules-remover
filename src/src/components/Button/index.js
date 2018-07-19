import React from 'react';
import styled from 'styled-components';

const Background = styled.label`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  background: ${props => props.outline ? 'white' : '#f25146'};
  color: ${props => props.outline ? '#f25146' : 'white'};
  border: ${props => props.outline ? '1px solid #f25146' : 'unset'};
  margin: 16px 24px;
  opacity: ${props => props.disabled && 0.3};
  transition: 0.3s all;
`;

const Button = (props) => (
  <Background outline={props.outline} onClick={!props.disabled && props.onClick} disabled={props.disabled}>
    {props.children && props.children}
    {props.text}
  </Background>
)

export default Button;
