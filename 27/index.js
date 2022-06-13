const mssql = require('mssql');

//mssql for docker command -  docker run -e "ACCEPT_EULA=1" -e "MSSQL_SA_PASSWORD=password123" -e "MSSQL_PID=Developer" -e "MSSQL_USER=SA" -p 1433:1433 -d --name=sql2 mcr.microsoft.com/azure-sql-edge

const config = {
    user: 'sa', //or SA
    password: 'password123',
    server: 'localhost',
    database: 'master',
    port: 1433,
    trustServerCertificate: true
}

let connection = new mssql.ConnectionPool(config);
connection.connect().then(() => {
    console.log('connection success');
    let request = new mssql.Request(connection);
    request
        .input('a_t', mssql.NVarChar, 'LAB-TECH')
        .query("delete dbo.Auditorium_type where auditorium_type=@a_t")
        .then((recordSet) => {
            console.log("Success:",recordSet.rowsAffected[0], 'rows were deleted');
            connection.close();
        }).catch(err => console.log("Error: "+err.originalError.info.message));
})
