import express from "express";
import config from "config";
import routes from "./api/routes";
import { SequelizeConnection } from "./db/sequelizeConnection";
import dbInit from "./db/init";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbManager = new SequelizeConnection();

app.listen(port, host, async () => {
  console.log(`server running on http://${host}:${port}`);
  await dbManager.connect();

  routes(app);
});
