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

const connection = new mssql.ConnectionPool(config);
connection.connect().then(() => {
    console.log('connection success');
    const request = new mssql.Request(connection);
    request
        .input('a_t', mssql.NVarChar, 'LAB-TECH')
        .input('a_tn', mssql.NVarChar, 'Лаборатория техарта')
        .query("insert dbo.Auditorium_type (auditorium_type, auditorium_typename) Values(@a_t,@a_tn)")
        .then((recordSet) => {
            console.log("Success");
            connection.close();
        }).catch(err => console.log('Error: '+err.originalError.info.message));
})
