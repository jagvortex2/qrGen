import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from 'path'; // Import the 'path' module
import { fileURLToPath } from 'url'; // Import the 'fileURLToPath' function



// Function to generate a PDF with repeated image and text
async function generatePdf(imgbytes, upText, secondText, botText) {

    //Variables to get the Location of the .PNG QR Code Image, and the Text to add 
// at the top and bottom of the qr image, to be inserted in a PDF Document  

//const imagePath =  './200250.png';
// Get the current module filename
const __filename = fileURLToPath(import.meta.url); 
// Get the current module directory
const __dirname = path.dirname(__filename); 
const imagePath = imgbytes;
const imageLog =  path.resolve(__dirname,"./assets/logo-carisma.jpeg");//imgbytes2"
const upperText = upText;
const secondUpText = `$ ${secondText}`;
const bottomText = botText;

   


    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();


    
    
    // Load the image from file
    const imageBytes = imagePath// fs.readFileSync(imagePath); //Se intentara leer el archivo png como bytes
    const imageLogoBytes =  await fs.promises.readFile(imageLog); 
    const image = await pdfDoc.embedPng(imageBytes);
    const imageLogo = await pdfDoc.embedJpg(imageLogoBytes);



    // Set the font size for the  text to display
    const fontSize = 5;
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const textColor = rgb(0.72, 0.58, 0.43) ; // Change the color to blue, values are between 0 and 1 for RGB



    // Set the size of the image to be repeated
    const imageSize = { width: 75, height:75 };



    // Calculate the number of times the image should be repeated horizontally and vertically
    const numCols = Math.ceil(page.getWidth() / imageSize.width -1);
    const numRows = Math.ceil(page.getHeight() / imageSize.height -2);
    console.log(numCols + " " + numRows);



   // Draw the image multiple times to cover the entire page
for (let row = 1; row < numRows; row++) {
    row+=0.42;
    for (let col = 1; col < numCols; col++) {
        col+=0.30;
        // Calculate x and y coordinates for placing the image
        let x = col * imageSize.width -39;
        let x1 = col * imageSize.width + 1;
        let y = (page.getHeight() - (row + 1) * imageSize.height) +18; // Adjust y-coordinate to start from the bottom


        
         // Draw the dotted rectangle around the image
         page.drawRectangle({
            x:(x +1) ,
            y: (y -1),
            width: imageSize.width +22 ,
            height: imageSize.height +32,
            borderColor: rgb(0, 0, 0),
            borderWidth: 1,
            borderDashArray: [3, 3],
        });
        

        
        // Draw the image on the page
        page.drawImage(image, {
             x:(x + 12) , 
            y:(y +18), 
            width: imageSize.width, 
            height: imageSize.height 
        });

          // Draw the logo on the page
          page.drawImage(imageLogo, {
            x:(x + 12) , 
           y:(y + 0.8), 
           width: imageSize.width -2, 
           height: imageSize.height / 4 //2.5 
       });

        

        // Adjust y coordinates for upper and bottom text with increased margin
        const margin = 7; // Adjust as needed
        const upperTextHeight = 5; // Adjust as needed
        const upperTextY = page.getHeight() - (row - 0.930)  * imageSize.height ; // Ensure upperTextY doesn't overlap with the image
        const bottomTextY = y + 2.2; // Adjust as needed

        const experimentalX = imageSize.width / 2;
        const experimentalX2 = (imageSize.width / 4) - 3;

        // Add upperText at the top of the image with margin
       //check if the text is greater than 12 characters to draw the image with experimentalX2, 
       //otherwise, print the image with experimentalX
       if(upperText.length <= 12)
       {
        page.drawText(upperText, {
            x:(x + (experimentalX - 4)) , // Adjust x-coordinate for justification and margin
            y: upperTextY - 32, //40,
            size: (fontSize + 2),
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });
    }else if(upperText.length <= 7){
        page.drawText(upperText, {
            x:(x + (experimentalX - 8)) , // Adjust x-coordinate for justification and margin
            y: upperTextY - 32, //40,
            size: (fontSize + 2),
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });

    }else{
        page.drawText(upperText, {
            x:(x + experimentalX2) , // Adjust x-coordinate for justification and margin
            y: upperTextY - 32, //40,
            size: (fontSize + 2),
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });
    }


        // Add SecondupperText at the top of the image with margin
        page.drawText(secondUpText, {
            x: (x + experimentalX),//imageSize.width -4,//(x + 41) , // Adjust x-coordinate for justification and margin
            y: upperTextY - 42,//50,
            size: (fontSize + 2),
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });



        // Add bottomText at the bottom of the image with margin
        page.drawText(bottomText, {
            x: x + margin + 32, // Adjust x-coordinate for justification and margin
            y: bottomTextY + 17,//7,
            size: (fontSize + 2),
            font: timesRomanFont,
            color: textColor,
            textAlign: 'center', // Adjust as needed
        });
    } //End of inner for loop
}   //End of outer for loop



    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./output.pdf', pdfBytes);
    console.log('PDF generated successfully.');

    //TODO later on, the pdf document will be returned to be handled by the calling function
    return pdfBytes;
    
}


export default generatePdf; //Export the module