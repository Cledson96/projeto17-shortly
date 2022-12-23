import { signup_Schema } from "../models/signup.models.js";
import { connection } from "./database/db.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
    const { username, email, password } = req.body
    const validation = signup_Schema.validate(req.body, { abortEarly: false });
    const passwordHash = bcrypt.hashSync(password, 10);
    if (validation.error) {
        res.status(422).send(validation.error.message);
        return
    }
    try {

        const { rows } = await connection.query(
            "SELECT * FROM users WHERE email=$1;",
            [email]
        );

        if (rows.length > 0) {
            res.status(404).send("Já existe um usuario cadastrado com este email!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }


    try {
        await connection.query("INSERT INTO users (name,email,password) VALUES ($1, $2, $3);", [username, email, passwordHash]);
        res.sendStatus(201);
    }
    catch (err) {
        res.status(500).send(err.message);
    }

}