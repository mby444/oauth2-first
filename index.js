import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "./config/dotenv.js";
import { connectDB } from "./database/connection.js";
import { route } from "./route/index.js";
import { signRoute } from "./route/sign.js";
import { oauth2Route } from "./route/oauth2.js";

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/sign", signRoute);
app.use("/oauth2", oauth2Route);
app.use("/", route);

connectDB(
  () => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running at port ${port}...`);
    });
  },
  (err) => {
    console.log("connectDB error: ", err);
  }
);
