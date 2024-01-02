import QRCode from 'qrcode';
import fs from 'fs';
import dbConnect from "./dbConnection.js";

/**
 *
 */
const data = dbConnect();    //Se obtiene la informacion a ser convertida en qr code



data.forEach(record => {
    if (record.EmpresaDestino === 'cany');
    console.log(record); // Aquí puedes acceder a las columnas de cada registro
});


QRCode.toFile('./images/file.png', 'Encode this text in QR code', {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
  });