import http from "node:http";
import os from "node:os";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { createTRPCContext, createTRPCRouter } from "./trpc";
import { healthEndpoint } from "./router/health";
import { ucrRouter } from "./router/ucr";

export const appRouter = createTRPCRouter({
  health: healthEndpoint,
  ucr: ucrRouter,
});

export type AppRouter = typeof appRouter;

// Get the private IP of the machine
function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface] ?? []) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

const host = getPrivateIP();
const port = 8080;

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

http
  .createServer((req, res) => {
    trpcHandler(req, res);
  })
  .listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
