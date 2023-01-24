import { serve } from "https://deno.land/std/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v2.5.1/mod.ts";
import { serveStatic, compiler } from "./middleware.ts";
import { resolve } from "https://deno.land/std@0.164.0/path/mod.ts";

const app = new Hono();

app.get(
	"*",
	serveStatic({
		root: resolve(Deno.cwd(), "./"),
	})
);

app.get('/_compiler/*', compiler({
	root: resolve(Deno.cwd(), "./"),
  }));

app.get("*", async (ctx) => {
	const shell = await Deno.readTextFile("./shell.html");
	const rendered = shell.replace("{importMap}", await Deno.readTextFile("./importMap.json"));
	return ctx.html(rendered);
});

serve(app.fetch);
