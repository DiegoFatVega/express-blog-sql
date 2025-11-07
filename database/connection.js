const mysql2 = require(`mysql2`)

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

connection.connect((err) => {
    if (err) { console.error('Error connecting to the Database', err) }
    console.log('******** Connected to Database ********')
})

module.exports = connection;