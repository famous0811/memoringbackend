import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
const ConnectDB = require("Module/connectDB");
const PORT = process.env.PORT || 4000;
ConnectDB();
app.get("/", (req, res) => {
  res.send("famous blog server");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
