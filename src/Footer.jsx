import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  background-color: #333;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  background: none;
  border: 1px solid #aaa;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;