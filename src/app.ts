import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import router from "./routers/index";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "100mb" }));
const ConnectDB = require("./Module/connectDB");
const PORT = process.env.PORT || 4000;
ConnectDB();

app.use("/", router);

app.get("/", (req, res) => {
  res.send("famous blog server");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
