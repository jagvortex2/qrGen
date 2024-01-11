// server
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Dummy data for the options
const options = [
    { id: 1, name: 'Option 1', data: 'Lorem ipsum 1' },
    { id: 2, name: 'Option 2', data: 'Lorem ipsum 2' },
    // Add more options as needed
];

app.get('/options', (req, res) => {
    // Return the list of options as JSON
    res.json(options);
});

app.get('/download', (req, res) => {
    const { selectedOption } = req.query;

    if (selectedOption) {
        // Find the selected option based on the ID
        const selectedData = options.find(option => option.id === parseInt(selectedOption, 10));

        if (selectedData) {
            // Serve the JSON data for the selected option
            res.json(selectedData);
        } else {
            res.status(404).json({ error: 'Option not found' });
        }
    } else {
        // Serve the JSON data for the whole list
        res.json(options);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
