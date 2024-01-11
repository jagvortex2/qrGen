import qr from 'qr-image';
import fs from 'fs';
import path from 'path'; // Import the 'path' module
import { fileURLToPath } from 'url'; // Import the 'fileURLToPath' function


// Get the current module filename
const __filename = fileURLToPath(import.meta.url); 
// Get the current module directory
const __dirname = path.dirname(__filename); 



// Function to generate a QR code Image
function generateQRCode(text, fileName) {

    // Save the QR Image as a temporary file
    const tempFilePath = path.resolve(__dirname, `./temp/${fileName}.png`);
    const file = tempFilePath;
    const textToEncode = `${text} \t1`;

    try {
        const qrCode = qr.imageSync(textToEncode, { type: 'png' });  // Use qr.imageSync to get a Buffer

        // Write the Buffer to a file
        fs.writeFileSync(file, qrCode);
        console.log(`QR code generated successfully and saved to ${file}`);
        return Buffer.from(qrCode);  // Convert the image to a buffer of bytes 
        
    } catch (err) 
        {
          console.error("Error trying to create file", err);
        }finally{
            fs.unlinkSync(file);
        }

}


   //pdfGenerator();
   export default generateQRCode;