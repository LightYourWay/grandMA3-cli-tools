// @ts-check

// Post-processes the tstl bundle: substitute the version placeholder
// (`__CLI_TOOLS_VERSION__`) with `v<package.json version>`. The Lua bundle,
// XML, and license prepend are handled by grandma3-tstl-plugin itself.

import { readFile, writeFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const bundle = `dist/${pkg.name}.lua`;

const lua = await readFile(bundle, 'utf8');
await writeFile(bundle, lua.replace(/__CLI_TOOLS_VERSION__/g, `v${pkg.version}`), 'utf8');

console.log(`Injected version v${pkg.version} into ${bundle}`);
