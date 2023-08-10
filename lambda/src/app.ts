import Koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import json from "koa-json";
import cors from "@koa/cors";
import { JWT } from "google-auth-library";

import { client_email, private_key } from "./config";
import { listEvents } from "./calendar";

const app = new Koa();
const router = new Router();

const client = new JWT({
  email: client_email,
  key: private_key,
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

app.context.client = client;

function addRoute(path: string, handler: Function) {
  router.get(path, async (ctx, next) => {
    ctx.body = await handler(ctx);
    await next();
  });
}

addRoute("/list", listEvents);

app
  .use(json())
  .use(logger())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
