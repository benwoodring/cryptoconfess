import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <MoonAndLandscape>
        {/* Background and moon illustration */}
      </MoonAndLandscape>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 250px;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoonAndLandscape = styled.div`
  /* Styling for the moon and landscape */
`;