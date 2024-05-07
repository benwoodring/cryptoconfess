import React, { useState, useEffect } from 'react';

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
        <select>
            {collections.map((collection, index) => (
                <option key={index} value={collection.name}>
                    {collection.prettyname}
                </option>
            ))}
        </select>
    );
}

export default ColDropdown;