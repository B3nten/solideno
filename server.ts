import { serve } from "https://deno.land/std/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v2.5.1/mod.ts";
import { compiler, serveStatic } from "./middleware.ts";
import { resolve } from "https://deno.land/std@0.164.0/path/mod.ts";
import { renderToString } from "solid-js/web";

import { App } from "./.out/src/server.entry.tsx";
import { createShell } from "./shell.ts";

const app = new Hono();

app.get(
  "*",
  serveStatic({
    root: resolve(Deno.cwd(), "./"),
  }),
);

app.get(
  "/_compiler/*",
  compiler({
    root: resolve(Deno.cwd(), "./"),
  }),
);

app.get("*", async (ctx) =>
  ctx.html(
    createShell(
      renderToString(App),
      await Deno.readTextFile("./importMap.json"),
    ),
  ));

serve(app.fetch);
