class Tabelas {
    init(conn) {
        this.conn = conn;

        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Atendimentos (
                id INT NOT NULL AUTO_INCREMENT,
                cliente VARCHAR(50) NOT NULL,
                pet VARCHAR(20),
                servico VARCHAR(20) NOT NULL,
                data DATETIME NOT NULL,
                dataCriacao DATETIME NOT NULL,
                status VARCHAR(20) NOT NULL,
                observacoes TEXT,
                PRIMARY KEY(id)
            )
        `;

        this.conn.query(sql, error => {
            if (error) {
                console.log(error);
            } else {
                console.log("Tabela Atendimentos criada com sucesso!");
            }
        });
    }
}

module.exports = new Tabelas;
