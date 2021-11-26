const mysql = require('mysql');

const conexão = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'root',
    database: 'agenda-petshop'
});

module.exports = conexão;
