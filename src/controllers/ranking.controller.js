import { connection } from "../database/db.js";

export async function ranking(req, res) {
    try {
     
     
        const user = await connection.query("SELECT users.*,count(shorten.*),sum(visitcount) FROM users join shorten ON users.id = shorten.userid join views on shorten.id = views.shortid  GROUP BY users.id ORDER BY sum ASC LIMIT 10;");
        
        const arruma = user.rows.map((ref) => {
            return (
                {
                    id: ref.id,
                    name: ref.name,
                    linksCount:ref.count,
                    visitCount: ref.sum
                   
                }
            )
        })
        
        console.log(user.rows)
   

        res.status(200).send(arruma
          
        )
        return
    } catch (err) {
        res.status(500).send(err.message);
    }
}