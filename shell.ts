import { generateHydrationScript } from "solid-js/web";

export function createShell(body: string, importMap: string) {
  return `<!DOCTYPE html>
	<html>
		<head>
			<title>Solideno</title>
			<script type="importmap">
				${importMap}
			</script>
			${generateHydrationScript()}
		</head>
		<body>
			<div id="root">${body}</div>
			<script type="module" src="/_compiler/src/client.entry.tsx"></script>
		</body>
	</html>`;
}
