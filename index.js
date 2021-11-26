const customExpress = require("./config/customExpress");
const conn = require("./infraestrutura/connection");
const Tabelas = require('./infraestrutura/tabelas')

conn.connect(error => {
    if (error) {
        console.error(error);
    } else {
        console.log('Conectado com sucesso!');

        Tabelas.init(conn);
        
        const app = customExpress();

        app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    }
});
