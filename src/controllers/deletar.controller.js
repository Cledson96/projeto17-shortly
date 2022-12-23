import { connection } from "../database/db.js";

export async function deletar(req, res) {
    const { id } = req.params;
    let userId = res.locals.user
    try {

        const { rows } = await connection.query("SELECT * FROM shorten WHERE id=$1;", [id]);
        if(!rows[0]){
            res.sendStatus(404)
            return
        }
        if(rows[0].userid !== userId){
            res.sendStatus(401)
            return
        }
       
    } catch (err) {
        res.status(500).send(err.message);
    }
    try {
        await connection.query("DELETE FROM shorten WHERE id=$1", [id]);
        res.sendStatus(204);
        return
      } catch (err) {
        res.status(500).send(err.message);
        return
      }
   
}