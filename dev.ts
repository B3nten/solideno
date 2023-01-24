import babel from "https://esm.sh/@babel/core";
import babelPresetTs from "https://esm.sh/@babel/preset-typescript";
import babelPresetSolid from "https://esm.sh/babel-preset-solid";
import { walk } from "https://deno.land/std/fs/mod.ts";

async function createFile(path: string, content: string) {
  try {
    await Deno.mkdir(path.substring(0, path.lastIndexOf("/")), {
      recursive: true,
    });
  } catch (e) {
    if (e instanceof Deno.errors.AlreadyExists) {
      console.log("Directory already exists");
    } else {
      throw e;
    }
  }
  Deno.writeTextFile(path, content);
}

async function transform(sourcepath: string, targetpath: string) {
  for await (const e of walk(sourcepath)) {
    if (e.isFile) {
      if (!e.path.endsWith(".ts") && !e.path.endsWith(".tsx")) {
        await createFile(targetpath + "/" + e.path, await Deno.readTextFile(e.path));
        continue;
      }
      const src = await Deno.readTextFile(e.path);
      const { code } = babel.transform(src, {
        presets: [
          babelPresetTs,
          [babelPresetSolid, { generate: "ssr", hydratable: true }],
        ],
        filename: e.name,
      });
      await createFile(targetpath + "/" + e.path, code);
    }
  }
}

await transform("./src", "./.out");

const p = Deno.run({
  cmd: ["deno", "run", "-A", "./server.ts"],
});

await p.status();
