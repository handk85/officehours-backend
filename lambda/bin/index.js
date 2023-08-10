import serverless from "aws-serverless-koa";
import app from "../src/app";

export const handler = serverless(app);
