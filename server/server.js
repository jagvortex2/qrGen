// server
// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import sql from "mssql";
import cors from 'cors';
import fs from 'fs';
import path from 'path'; // Import the 'path' module
import { fileURLToPath } from 'url'; // Import the 'fileURLToPath' function
import createQR from "../helpers/createQR.js";
import createPdf from "../helpers/createPdf.js";
import trimAndSplitString from '../helpers/rexExpress.js';


const app = express();   //prepare express to handle requests
const PORT = process.env.PORT || 5000;


// Get the current module filename
const __filename = fileURLToPath(import.meta.url); 
// Get the current module directory
const __dirname = path.dirname(__filename); 


dotenv.config();  // Load environment variables from the .env file


// configurar la base de datos
const config = {
    user: 'sa',
    password: '$0ftland',
    server: '192.168.0.44',
    database: 'SOFTLAND',
    synchronize: true,
    trustServerCertificate: true,
};


//accept cors
app.use(cors());


// Body parsing middleware
app.use(express.json());


//Endpoint to show the menu interface
app.get('/', async (req, res) =>{
    res.render("index.ejs");
});


// Endpoint used to generate qr and pdf
app.post('/generarpdf', async (req, res) => {
    try {
        const {ARTICULO, DESCRIPCION} = req.body;
        const trimmedDescription = trimAndSplitString(DESCRIPCION); //An arrary that holds the article name and its price
        const filename = ARTICULO;
        const precio = trimmedDescription[1];
        const descripcion = trimmedDescription[0];

        try {
            const qrBytes = createQR(filename, filename);
            const pdfBytes = await createPdf(qrBytes, descripcion, precio, filename);

            // Save the PDF as a temporary file
            const tempFilePath = path.resolve(__dirname, `./temp/${filename}.pdf`);
            fs.writeFileSync(tempFilePath, pdfBytes);

            // Set the appropriate headers for the PDF response
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);

            // Send the PDF file as a response
            res.sendFile(tempFilePath, {}, (err) => {
                // Remove the temporary file after sending
                fs.unlinkSync(tempFilePath);
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Internal Server Error');
                }
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


//Rutas importantes


app.get('/app', async (req, res) => {
    res.send("<h1>Nothing yet!</h1>");
});


// Endpoint to fetch data from the SQL Server
app.get('/articulos', async (req, res) => {
    try {
        //Create a connection Pool
        const pool = await sql.connect(config);
        //Query the database
        const result = await pool.query('SELECT ARTICULO, DESCRIPCION FROM SOFTLAND.CANNYSHOP.ARTICULO WHERE (DESCRIPCION != \'\' OR DESCRIPCION NOT LIKE NULL) AND LEN(ARTICULO) = 6 AND ISNUMERIC(ARTICULO) = 1 UNION SELECT ARTICULO, DESCRIPCION FROM SOFTLAND.CANNYSHOP.ARTICULO_COMPRA WHERE (DESCRIPCION != \'\' OR DESCRIPCION NOT LIKE NULL) AND LEN(ARTICULO) = 6 AND ISNUMERIC(ARTICULO) = 1 ORDER BY DESCRIPCION ASC');
        //Testing a union query 
        //const result = await pool.query('SELECT ARTICULO, DESCRIPCION FROM SOFTLAND.CANNYSHOP.ARTICULO_COMPRA WHERE Descripcion != \'\';');
        // console.log(result);
        const records = result.recordset;
        console.log('Success!');
        //send the response as a JSON
        res.status(200).json(records);
    }catch (error){
        console.error("Error fetching data from the database:", error);
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
});


// Endpoint to download JSON data based on the selected option
app.get('/download', (req, res) => {
    const { selectedOption } = req.query;

    if (selectedOption) {
        const selectedData = options.find(option => option.id === parseInt(selectedOption, 10));

        if (selectedData) {
            res.json(selectedData);
        } else {
            res.status(404).json({ error: 'Option not found' });
        }
    } else {
        res.json(options);
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



