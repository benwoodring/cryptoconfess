import React, { useRef } from 'react';
import styled from 'styled-components';

const PuzzleContainer = styled.div`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  border-bottom: 1px solid #34495e;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const PuzzleDetail = styled.p`
  margin: 10px 0;
  line-height: 1.6;
  font-size: 16px;
`;

const CharInput = styled.input`
  width: 20px;
  margin: 0 1px;
  border: none;
  border-bottom: 2px solid #2980b9;
  background-color: transparent;
  color: #ecf0f1;
  font-size: 16px;
  text-align: center;
  &:focus {
    outline: none;
    border-bottom-color: #f39c12;
  }
`;

const CharContainer = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 5px; // Add space between character groups
`;


const EncryptedChar = styled.div`
  color: #f39c12; // A distinct color for encrypted characters
`;

function encryptCharacter(char) {
  const shift = 3;
  if (char.match(/[a-z]/i)) {
    // Get the character code of the letter, and shift it
    let code = char.charCodeAt(0);
    if ((code >= 65) && (code <= 90)) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65); // Uppercase letters
    } else if ((code >= 97) && (code <= 122)) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97); // Lowercase letters
    }
  }
  return char; // Return the original character if it's not a letter
}

function DisplayPuzzle({ puz }) {
  const inputRefs = useRef([]);

  const renderCharOrInput = (char, index) => {
    if (char === ' ') {
      return <span key={index}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
    }
    if (/[^a-zA-Z0-9]/.test(char)) {
      return <span key={index}>{char}{char === '.' ? <br /> : null}</span>;
    }
    const thisInputIndex = inputRefs.current.length;
    inputRefs.current.push(null); // Push new ref placeholder
    return (
      <CharContainer key={index}>
      <CharInput
        key={index}
        type="text"
        maxLength="1"
        onChange={handleInputChange(thisInputIndex)}
        onKeyDown={handleKeyDown(thisInputIndex)}
        ref={el => inputRefs.current[thisInputIndex] = el}
      />
      <EncryptedChar>{encryptCharacter(char)}</EncryptedChar>
      </CharContainer>
    );
  };

  const handleInputChange = index => event => {
    if (event.target.value.length === 1) {
      const nextIndex = (index + 1) % inputRefs.current.length;
      inputRefs.current[nextIndex] && inputRefs.current[nextIndex].focus();
      if (inputRefs.current[nextIndex].value.length > 0) {
        inputRefs.current[nextIndex].select();
      }
    }
    
  };

  const handleKeyDown = index => event => {
    if (event.target.value.length === 0) {
      if (event.key === 'Backspace') {
        const prevIndex = (index - 1) % inputRefs.current.length;
        inputRefs.current[prevIndex] && inputRefs.current[prevIndex].focus();
        if (inputRefs.current[prevIndex].value.length > 0) {
          inputRefs.current[prevIndex].select();
        }
      }
    }
  }

  const renderPuzzleBody = () => {
    if (!puz || !puz.body) {
      return <p>No puzzle data available.</p>;
    }
    return puz.body.split('').map(renderCharOrInput);
  };

  return (
    <PuzzleContainer>
      <Title>Puzzle:</Title>
      {puz ? (
        <>
          <PuzzleDetail><strong>Reference:</strong> {puz.reference}</PuzzleDetail>
          <PuzzleDetail><strong>Body:</strong> {renderPuzzleBody()}</PuzzleDetail>
        </>
      ) : (
        <p>Puzzle data is not available or is still loading.</p>
      )}
    </PuzzleContainer>
  );
}

export default DisplayPuzzle;