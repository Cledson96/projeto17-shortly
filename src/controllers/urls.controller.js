import { connection } from "../database/db.js";

export async function urls(req, res) {
    const { id } = req.params;
    console.log(id)

    try {

        const { rows } = await connection.query("SELECT * FROM shorten WHERE id=$1;", [id]);

        if (rows.length > 0) {
            res.status(200).send(rows[0]);
            return
        } else {
            res.sendStatus(404)
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }


}