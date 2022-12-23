import { connection } from "../database/db.js";
import { signin_Schema } from "../models/signin.models.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function signin(req, res) {

    const { email, password } = req.body
    const validation = signin_Schema.validate(req.body, { abortEarly: false });
    const token = v4();
    let rows


    if (validation.error) {
        res.status(422).send(validation.error.message);
        return
    }
    try {

        rows = await connection.query("SELECT * FROM users WHERE email=$1;", [email]);

        if (rows.rows.length === 0) {

            res.status(401).send("Usuario ou senhas incorretos!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    const passwordvalidation = bcrypt.compareSync(password, rows.rows[0].password);

    if (!passwordvalidation) {
        return res.status(401).send("Senha ou usuario errado!");
    }

    try {

        const session = await connection.query("SELECT * FROM session WHERE email=$1;", [email]);

        if (session.rows.length > 0) {
            res.status(200).send(session.rows[0].token);

            return
        } else {
            await connection.query("INSERT INTO session (email,token) VALUES ($1, $2);", [email, token]);
            res.status(200).send(token);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }


}