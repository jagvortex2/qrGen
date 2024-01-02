import fs from 'fs';
import PDFDocument from 'pdfkit';
import sql from 'mssql'
import express from 'express';



const app = express;
const PORT = 3000;


app.listen(PORT, () =>{
    console.log(`listening on ${PORT} port!`);
});

app.get("/", (req, res) =>{

});




// Configuration for PDF generation
const pdfConfig = {
    margin: 50,
};


const generateQRCodePDF = async () => {
    const doc = new PDFDocument();


        /**
         * Try to call function @params {Function} dbConnect
        */




        // Set up the PDF document
        doc.pipe(fs.createWriteStream('salesTags.pdf'));

        // Add content to the PDF
        doc.fontSize(18).text('Sales Tags', { align: 'center', margin: [0, 0, 0, pdfConfig.margin] });

        // Loop through the result set and generate QR codes
        for (const row of result.recordset) {
            const qrCodeData = `Product ID: ${row.ProductID}, Price: $${row.Price}`;
            const qrCodeImage = await QRCode.toBuffer(qrCodeData, { width: 100 });

            doc.addPage()
                .image(qrCodeImage, pdfConfig.margin, pdfConfig.margin, { width: 100 })
                .text(`Product ID: ${row.ProductID}`, pdfConfig.margin + 120, pdfConfig.margin + 20)
                .text(`Price: $${row.Price}`, pdfConfig.margin + 120, pdfConfig.margin + 40);
        }

        // Finalize the PDF document
        doc.end();

        console.log('Sales tags generated successfully.');


};

// Call the function to generate QR codes in PDF
generateQRCodePDF();
