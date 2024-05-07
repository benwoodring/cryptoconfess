import React from 'react';

function PuzDropdown({ puzs }) {
    return (
      <select>
        <option value="">Select a Puzzle</option>
        {puzs.map((puz, reference) => (
          <option key={reference} value={puz}>{puz}</option>
        ))}
      </select>
    );
}

export default PuzDropdown;
  