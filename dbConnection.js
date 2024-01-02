import sql from 'mssql';
import fs, { writeFile } from "fs";


let result;
let jsonResults;
const path = './assets/registro_detalleRegistro.json';

//Funcion utilizada para crear una configuracion y conexion a la base de datos a ser utilizada para ver registros
function  dbConnect() {

    

    // configurar la base de datos
    const config = {
        user: 'sa',
        password: '$0ftland',
        server: '192.168.0.44',
        database: 'BODEGA',
        synchronize: true,
        trustServerCertificate: true,
    };

    //Conectar a la base de datos
    const connection = async ()  =>{
        try {
                await sql.connect(config);
            console.log("Connected to database");

                // Query the database
                result = await sql.query('SELECT ArticuloDetalle, PrecioUnitario, Descripcion, Articulo, CodigoBarra, EmpresaDestino, Cantidad ' +
                    'FROM BODEGA.dbo.REGISTRO INNER JOIN BODEGA.dbo.DETALLEREGISTRO' +
                    ' ON BODEGA.dbo.REGISTRO.IdRegistro = BODEGA.dbo.DETALLEREGISTRO.IdRegistro;');
               // console.log(result);
                const records = result.recordset;

            // Imprime el resultado como JSON
            jsonResults =JSON.stringify(records, null, 2);
            //console.log(jsonResults);


            // Itera sobre los registros
            records.forEach(record => {
                console.log(record); // Aquí puedes acceder a las columnas de cada registro
    
            });
            fs.writeFile(path, jsonResults, (error) => {
                if(error){
                    console.log('An error has ocurred trying to write the json file to disk', error);
                    return;
                }
                else console.log('Data written succesfully to disk!');
            });

            }catch(err){
                console.log("Error trying to connect to database:" + err.message);
            } finally {
                sql.close();
                console.log("Connection to Db Closed succesfully");
            }
        };

    connection();
    
}



  dbConnect();
 
 

export default dbConnect;