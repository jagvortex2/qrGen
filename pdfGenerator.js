const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const { promisify } = require('util');
const { readFile } = require('fs/promises');
const { createCanvas, loadImage } = require('canvas');

const readFileAsync = promisify(readFile);

async function generatePdf(img) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Load the image from file (replace 'path/to/your/image.jpg' with your image path)
    const imageBytes = await readFileAsync('path/to/your/image.jpg');
    const image = await pdfDoc.embedJpg(imageBytes);

    // Set the size of the image to be repeated
    const imageSize = { width: 100, height: 100 };

    // Calculate the number of times the image should be repeated horizontally and vertically
    const numCols = Math.ceil(page.getWidth() / imageSize.width);
    const numRows = Math.ceil(page.getHeight() / imageSize.height);

    // Draw the image multiple times to cover the entire page
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * imageSize.width;
            const y = page.getHeight() - (row + 1) * imageSize.height; // Adjust y-coordinate to start from the bottom
            page.drawImage(image, { x, y, width: imageSize.width, height: imageSize.height });
        }
    }

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('output.pdf', pdfBytes);

    console.log('PDF generated successfully.');
}

export default generatePdf;
