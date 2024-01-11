/* import sql from 'mssql';

//Funcion utilizada para crear una configuracion y conexion a la base de datos a ser utilizada para ver registros
function  dbConnect() {

    let result;
    let jsonResults;

    // configurar la base de datos
    const config = {
        user: 'sa',
        password: '$0ftland',
        server: 'localhost',
        database: 'BODEGA_NYC',
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
                console.log(result);
                const records = result.recordset;

            // Imprime el resultado como JSON
            jsonResults =JSON.stringify(records, null, 2);
            console.log(jsonResults);


            // Itera sobre los registros
            records.forEach(record => {
                console.log(record); // Aquí puedes acceder a las columnas de cada registro
            });

            }catch(err){
                console.log("Error trying to connect to database:" + err.message());
            } finally {
                sql.close();
                console.log("Connection to Db Closed succesfully");
            }
        };

    connection();
    return jsonResults;
}



 dbConnect();
export default dbConnect; */