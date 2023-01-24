import { App } from "./app.tsx";
import { hydrate, render } from "solid-js/web";
hydrate(App, document.getElementById("root"));
