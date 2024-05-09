import React, { useRef, useState, useEffect } from 'react';
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
  display: flex;            // Changed from inline-flex to flex
  flex-direction: column;   // Stack children vertically
  align-items: center;      // Center-align the children horizontally
  text-align: center;
  margin-right: 5px;        // Maintain right margin for spacing
`;

const EncryptedChar = styled.div`
  color: #f39c12;
`;

const CharGroup = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
`;

const PuzzleBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: normal;
`;

function encryptCharacter(char) {
  const shift = 3;
  if (char.match(/[a-z]/i)) {
    let code = char.charCodeAt(0);
    if ((code >= 65) && (code <= 90)) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if ((code >= 97) && (code <= 122)) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
  }
  return char;
}

function DisplayPuzzle({ puz }) {
  const inputRefs = useRef([]);
  const [encryptedChars, setEncryptedChars] = useState([]);

  useEffect(() => {
    if (puz && puz.body) {
      setEncryptedChars(puz.body.split('').map(char => encryptCharacter(char.toUpperCase())));
    }
  }, [puz?.body]);

  const handleInputChange = index => event => {
    const newValue = event.target.value.toUpperCase();
    const encryptedCharOfCurrent = encryptedChars[index];

    encryptedChars.forEach((encChar, idx) => {
      if (encChar === encryptedCharOfCurrent && newValue.length <= 1) {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = newValue;
        }
      }
    });

    const nextIndex = (index + 1) % inputRefs.current.length;
    inputRefs.current[nextIndex]?.focus();
    if (inputRefs.current[nextIndex]?.value.length > 0) {
      inputRefs.current[nextIndex].select();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.target.value.length === 0 && event.key === 'Backspace') {
      const prevIndex = (index - 1 + inputRefs.current.length) % inputRefs.current.length;
      inputRefs.current[prevIndex]?.focus();
      if (inputRefs.current[prevIndex]?.value.length > 0) {
        inputRefs.current[prevIndex].select();
      }
    }
  };

  const renderCharOrInput = (char, index) => {
    if (/[^a-zA-Z0-9]/.test(char)) { // Check if the character is NOT alphanumeric
      return <span key={index}>{char}</span>; // Display punctuation normally
    } else {
      return ( // For alphanumeric characters, render input box and encrypted character below
        <CharContainer key={index}>
          <CharInput
            type="text"
            maxLength="1"
            onChange={handleInputChange(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            ref={el => inputRefs.current[index] = el}
          />
          <EncryptedChar>{encryptedChars[index]}</EncryptedChar>
        </CharContainer>
      );
    }
  };

  const renderPuzzleBody = () => {
    if (!puz || !puz.body) {
      return <p>No puzzle data available.</p>;
    }
    
    let groups = [];
    let currentGroup = [];

    puz.body.split('').forEach((char, index) => {
      if (char !== ' ') {
        currentGroup.push(renderCharOrInput(char, index));
      } else {
        if (currentGroup.length) {
          groups.push(<CharGroup key={`group-${groups.length}`}>{currentGroup}</CharGroup>);
          currentGroup = [];
        }
        groups.push(<span key={`space-${index}`}>&nbsp;&nbsp;&nbsp;&nbsp;</span>);
      }
    });

    if (currentGroup.length) {
      groups.push(<CharGroup key={`group-${groups.length}`}>{currentGroup}</CharGroup>);
    }

    return <PuzzleBody>{groups}</PuzzleBody>;
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
        <PuzzleDetail>Puzzle data is not available or is still loading.</PuzzleDetail>
      )}
    </PuzzleContainer>
  );
}

export default DisplayPuzzle;