

// Import necessary modules from 'pdf-lib', 'fs', 'fs/promises', and 'canvas'
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import { promisify } from "util";
import { readFile } from "fs/promises";
import { createCanvas, loadImage } from "canvas";


// Function to generate a PDF with repeated image and text
async function generatePdf() {


    //the object to test the dataa} added to the qr
    const testObj = {
        "ArticuloDetalle": "200250",
        "PrecioUnitario": 2.5,
        "Descripcion": "PLAYERA $2.50",
        "Articulo": "P746",
        "CodigoBarra": "AP310705523",
        "EmpresaDestino": "cany",
        "Cantidad": 120
      }


    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();


    // Load the image from file (replace 'path/to/your/image.jpg' with your image path)
    const imageBytes = fs.readFileSync('./assets/images/file1.png');
    const image = await pdfDoc.embedPng(imageBytes);

     
    //Specify the text to be added to the pdf
    const upperText = testObj.ArticuloDetalle;
    const bottomText = testObj.Descripcion; // + " " + "$" + testObj.PrecioUnitario;


    // Set the font size for the  text to display
    const fontSize = 7;
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textColor = rgb(0.72, 0.58, 0.43) ; // Change the color to blue, values are between 0 and 1 for RGB

    // Set the size of the image to be repeated
    const imageSize = { width: 80, height:80 };

    // Calculate the number of times the image should be repeated horizontally and vertically
    const numCols = Math.ceil(page.getWidth() / imageSize.width - 1);
    const numRows = Math.ceil(page.getHeight() / imageSize.height - 1);
    console.log(numCols + " " + numRows);

   // Draw the image multiple times to cover the entire page
for (let row = 1; row < numRows; row++) {
    for (let col = 1; col < numCols; col++) {
        // Calculate x and y coordinates for placing the image
        const x = col * imageSize.width;
        const x1 = col * imageSize.width + 2;
        const y = page.getHeight() - (row + 1) * imageSize.height; // Adjust y-coordinate to start from the bottom

        // Draw the image on the page
        page.drawImage(image, { x , y, width: imageSize.width, height: imageSize.height });

        // Adjust y coordinates for upper and bottom text with increased margin
        const margin = 7; // Adjust as needed
        const upperTextHeight = 5; // Adjust as needed
        const upperTextY = page.getHeight() - (row - 0.900) * imageSize.height ; // Ensure upperTextY doesn't overlap with the image
        const bottomTextY = y + 2; // Adjust as needed

        // Add upperText at the top of the image with margin
        page.drawText(upperText, {
            x: x + margin, // Adjust x-coordinate for justification and margin
            y: upperTextY,
            size: fontSize,
            font: timesRomanFont,
            color: textColor,
            textAlign: 'letf', // Adjust as needed
        });

        // Add bottomText at the bottom of the image with margin
        page.drawText(bottomText, {
            x: x + margin, // Adjust x-coordinate for justification and margin
            y: bottomTextY,
            size: fontSize,
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });
    }
}



    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('output.pdf', pdfBytes);

    console.log('PDF generated successfully.');
}

// Call the function to generate the PDF
generatePdf();



export default generatePdf;

