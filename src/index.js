import express from "express";
import signup from "./routes/signup.route.js";
import signin from "./routes/signin.route.js";
import shorten from "./routes/shorten.route.js";


const app = express();
app.use(express.json());

app.use(signup);
app.use(signin);
app.use(shorten);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));