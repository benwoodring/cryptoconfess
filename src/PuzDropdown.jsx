import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%; // Adjust this as needed
  padding: 8px; // Provide padding to make the dropdown more accessible
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

  // Style for the dropdown options
  option {
    background-color: #2c3e50; // Match the background of the dropdown with the overall theme
    color: #ecf0f1;
  }
`;

function PuzDropdown({ puzs, onPuzChange, selectedPuz }) {
    return (
      <StyledSelect onChange={onPuzChange} value={selectedPuz}>
      <option value="">Select a Puzzle</option>
      {puzs.map((puz, index) => (
        <option key={index} value={puz.id}>{puz.reference}</option>
      ))}
</StyledSelect>
    );
}

export default PuzDropdown;
  