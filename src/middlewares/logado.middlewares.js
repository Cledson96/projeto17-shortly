import { connection } from "../database/db.js";

export async function validador(req, res, next) {
    const { authorization } = req.headers;
  
  const token = authorization?.replace("Bearer ","");


  let rows
  if (!token) {
    return res.status(401).send("Obrigatório envio de um token valido!");
  }

  try {

    rows = await connection.query("SELECT * FROM session WHERE token=$1;", [token]);

    if (rows.rows.length === 0) {

        res.status(401).send("token invalido!");
        return
    }
   
    res.locals.user = rows.rows[0].userid;
} catch (err) {
    res.status(500).send(err.message);
}


  next();
}