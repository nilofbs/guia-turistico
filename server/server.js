const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'turismomaranhao'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

app.get('/destinos', (req, res) => {
    db.query('SELECT * FROM destinos', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.get('/destinos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM destinos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results[0]);
    });
});

app.get('/destinos/:id/atrativos', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM atrativos WHERE destino_id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});
