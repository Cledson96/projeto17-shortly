import express from "express";
import signup from "./routes/signup.route.js";

const app = express();
app.use(express.json());

app.use(signup);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));