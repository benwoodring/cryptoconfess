import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Encryptor from './Encryptor';
import Footer from './Footer';

function App() {
  return (
    <AppContainer>
      <Header />
      <Encryptor />
      <Footer />
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