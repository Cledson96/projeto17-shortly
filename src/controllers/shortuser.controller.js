import { connection } from "../database/db.js";

export async function shortuser(req, res) {
    let userId = res.locals.user

    try {

        const { rows } = await connection.query("SELECT sum(visitcount) FROM views WHERE userid=$1;", [userId]);
        const user = await connection.query("SELECT * FROM users WHERE id=$1;", [userId]);
        const shortenedUrls = await connection.query(`SELECT * FROM shorten JOIN views ON shorten.id = views.shortid WHERE shorten.userid=$1 ;`, [userId]);
        console.log(shortenedUrls.rows)
        const arruma = shortenedUrls.rows.map((ref) => {
            return (
                {
                    id: ref.id,
                    shortUrl: ref.shorturl,
                    url:ref.url,
                    visitCount:ref.visitcount
                }
            )
        })
   


        res.status(200).send(
            {
                id: userId,
                name: user.rows[0].name,
                visitCount: rows[0].sum,
                shortenedUrls: arruma
            }
        )
        return
    } catch (err) {
        res.status(500).send(err.message);
    }
}