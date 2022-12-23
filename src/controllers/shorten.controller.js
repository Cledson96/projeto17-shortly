import { connection } from "../database/db.js";
import { nanoid } from 'nanoid'


export async function shorten(req, res) {

    const url = req.body.url

    let user

    if (!url) {
        res.status(401).send("body invalido!!!")
    }
    console.log(res.locals.user)

}