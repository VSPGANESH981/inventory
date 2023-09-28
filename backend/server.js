const express = require("express");
const morgan = require("morgan");
const Cors = require("cors");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const cookieParser = require('cookie-parser');

const { initDb } = require("./utils/db");
const itemRouter = require("./routes/items/items");
const userRouter = require("./routes/users/users");

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
// App Config

const app = express();
const port = process.env.port || 8001;
const host = "0.0.0.0";

// midde ware
app.use(morgan("dev"));
app.use(express.json());
app.use(Cors({ origin:true, credentials: true }));
app.use(cookieParser());


initDb();

//API Endpoint

app.get("/api", (req, res) => res.status(200).send(" Programmers!!!"));


app.use("/api",userRouter);
app.use("/api", itemRouter);

//Listener
app.listen(port,host, () => console.log(`listening on ${host}: ${port}`));
