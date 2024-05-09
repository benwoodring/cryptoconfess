import React, { useState, useEffect } from 'react';
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

function ColDropdown({onColChange, selectedCol}) {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://benjaminjwoodring.com:1611/cccapi/getcollections')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCollections(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <StyledSelect onChange={onColChange} value={selectedCol}>
            <option value="">Select a Collection</option>
            {collections.map((collection, index) => (
                <option key={index} value={collection.name}>
                    {collection.prettyname}
                </option>
            ))}
        </StyledSelect>
    );
}

export default ColDropdown;