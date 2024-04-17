import { readFileSync } from "node:fs";
import { publicProcedure } from "../trpc";

export const healthEndpoint = publicProcedure.query(() => {
  return {
    status: "ok",
    environment: process.env.ENV ?? "local",
    version: JSON.parse(readFileSync("package.json", "utf8")).version,
  };
});
