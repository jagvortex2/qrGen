// frontend/src/components/SelectForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// React component to display a form with a select dropdown
const SelectForm = () => {
    // State variables to manage options, selected option, and handle changes
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    // Fetch options from the server when the component mounts
    useEffect(() => {
        axios.get('/options')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching options:', error);
            });
    }, []);

    // Handle change in the selected option
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Handle download button click
    const handleDownload = () => {
        window.location.href = `/download?selectedOption=${selectedOption}`;
    };

    // JSX rendering for the component
    return (
        <div>
            <h1>Select an Option</h1>
            <form>
                <label>
                    Options:
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled>Select an option</option>
                        {options.map(option => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                    </select>
                </label>
                <button type="button" onClick={handleDownload}>
                    Download File
                </button>
            </form>
        </div>
    );
};

export default SelectForm;

