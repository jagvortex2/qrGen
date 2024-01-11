// frontend/src/index.js
//Copy code
// pages/index.js
/*
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SelectForm from '../components/SelectForm';

const Home = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Fetch data from the server (Express API) to populate the dropdown options
        // You can use fetch or axios to make a GET request to the API endpoint
        fetch('/api/data') // Assuming your Express server is running on the same host
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(error => console.error('Error fetching data from the API:', error));
    }, []);

    return (
        <Layout>
            <h2>Select an Option</h2>
            <SelectForm options={options} />
        </Layout>
    );
};

export default Home;

*/

