import { connection } from "../database/db.js";

export async function open(req, res) {
    const { shortUrl } = req.params;
    try {

        const { rows } = await connection.query("SELECT * FROM shorten WHERE shorturl=$1;", [shortUrl]);


        if (rows.length > 0) {
            const site = rows[0].url?.replace("https://", "");
            let verifica = await connection.query("SELECT * FROM views WHERE shortid=$1;", [rows[0].id]);
            let contagem = 1
            console.log(verifica.rows.length)

            if (verifica.rows.length > 0) {
     
                contagem = verifica.rows[0].visitcount + 1
                await connection.query("UPDATE views SET visitcount=$1 WHERE shortid=$2;", [contagem, rows[0].id]);
                res.redirect(`http://${site}`);
          
                return
            }
            await connection.query("INSERT INTO views (shortid, userid,visitcount) VALUES ($1, $2,$3);", [rows[0].id, rows[0].userid, contagem]);
            res.redirect(`http://${site}`);

        } else {
            res.sendStatus(404)
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }


}