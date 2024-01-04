import QRCode from 'qrcode';
import fs from 'fs';
import dbConnect from "./dbConnection.js";
import pdfGenerator from "./pdfGenerator.js"

/**
 *
 */
//const data = dbConnect();    //Se obtiene la informacion a ser convertida en qr code



/* data.forEach(record => {
    if (record.EmpresaDestino === 'cany');
    console.log(record); // Aquí puedes acceder a las columnas de cada registro
}); */



const testObj = {
  "ArticuloDetalle": "200250",
  "PrecioUnitario": 2.5,
  "Descripcion": "PLAYERA $2.50",
  "Articulo": "P746",
  "CodigoBarra": "AP310705523",
  "EmpresaDestino": "cany",
  "Cantidad": 120
}




  QRCode.toFile('./assets/images/file.png',`${testObj.ArticuloDetalle} + \n + ${testObj.CodigoBarra} + \t + 1`, {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
  });

  //await
   pdfGenerator();