import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import ColDropdown from './ColDropdown';
import PuzDropdown from './PuzDropdown';
import DisplayPuzzle from './DisplayPuzzle';



function PuzDropdownContainer() {
    const [selectedCol, setSelectedCol] = useState('');
    const [puzs, setPuzs] = useState([]);
    const [selectedPuz, setSelectedPuz] = useState(null);

    useEffect(() => {
        if (selectedCol) {
            fetch(`http://benjaminjwoodring.com:1611/cccapi?doc=${encodeURIComponent(selectedCol)}`)
                .then(response => response.json())
                .then(data => {
                    setPuzs(data.map(item => item));
                })
                .catch(error => console.error('Error fetching puzzles:', error));
        } else {
            setPuzs([]);
        }
    }, [selectedCol]);
    
    const handleColChange = (event) => {
        setSelectedCol(event.target.value);
    };

    const handlePuzChange = (event) => {
      const puzId = event.target.value;
      console.log(puzId);
      const foundPuz = puzs.find(puz => puz.reference.toString() === puzId);
      setSelectedPuz(foundPuz);
  };

    return (
        <PuzContainer>
          <ColDropdown
            onColChange={handleColChange}
            selectedCol={selectedCol}
          />
          <PuzDropdown 
            puzs={puzs}
            onPuzChange={handlePuzChange}
            selectedPuz={selectedPuz}
          />
          <DisplayPuzzle 
            puz={selectedPuz}
          />
        </PuzContainer>

      
      );
}

export default PuzDropdownContainer;
    


const PuzContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  text-align: center;
`;

const RotorDisplay = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const RotorKey = styled.div`
  font-size: 20px;
  padding: 5px 10px;
  margin: 2px;
  border: 1px solid #ffffff50;
  color: white;
`;