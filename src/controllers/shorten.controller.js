import { connection } from "../database/db.js";
import { nanoid } from 'nanoid'


export async function shorten(req, res) {

    const url = req.body.url

    let userId = res.locals.user


    if (!url) {
        res.status(422).send("body invalido!!!")
    }

    let model = nanoid(10).toLowerCase()

    try {

        const { rows } = await connection.query("SELECT * FROM shorten WHERE url=$1;", [url]);

        if (rows.length > 0) {
            res.status(422).send(`Esta url ja esta encurtada com a shortUrl= ${rows[0].shorturl}`);
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {
        await connection.query("INSERT INTO shorten (url,shorturl,userid) VALUES ($1, $2, $3);", [url, model, userId]);
        res.status(201).send({
            "shortUrl": model
        });
    } catch (err) {
        res.status(500).send(err.message);
    }

}