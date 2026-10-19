import express from "express";
import mysql from "mysql2";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

app.get('/', (req, res ) => {
    res.status(200).json({message: 'Működik'});
});

app.get('/jarmuvek', (req, res) => {
    pool.query('SELECT * FROM jarmuvek j INNER JOIN tulajdonosok t ON j.tulajdonos_id = t.id ORDER BY j.javitasi_koltseg DESC', (err, result) => {
        if (err) res.status(500).json ({hiba: err});

        res.status(200).json(result);
    })
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});

