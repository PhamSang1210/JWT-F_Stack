import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import route from "./routes/index.js";
dotenv.config();
import connect from "./config/db/connect.js";
const app = express();
const PORT = process.env.PORT;
connect();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
route(app);
app.listen(PORT, () => {
    console.log(`Listen at PORT: http://localhost:${PORT}`);
});
