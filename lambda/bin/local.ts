import * as Koa from "koa";
import app from "../src/app";

app.listen(3000, () => {
  console.log("Listening port 3000");
});
