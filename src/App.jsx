import React from 'react';
import styled from 'styled-components';
import PuzDropdownContainer from './PuzDropdownContainer';

function App() {
  return (
    <AppContainer>
      <PuzDropdownContainer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: #000000;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;