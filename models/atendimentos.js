const moment = require('moment');

const conn = require('../infraestrutura/connection')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        }

        const atendimentoDatado = {
            ...atendimento,
            dataCriacao,
            data
        }
        const sql = 'INSERT INTO Atendimentos SET ?';

        conn.query(sql, atendimentoDatado, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(201).json(atendimento);
            }
        });
    }

    lista(res) {
        const sql = `
            SELECT * FROM Atendimentos
        `

        conn.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(result);
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `
            SELECT * FROM Atendimentos WHERE id=${id}
        `;

        conn.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                const atendimento = result[0];

                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = `
            UPDATE Atendimentos SET ? WHERE id=?
        `;

        conn.query(sql, [valores, id], (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }

    deleta(id, res) {
        const sql = `
            DELETE FROM Atendimentos WHERE id=?
        `;

        conn.query(sql, id, (error, result) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;
