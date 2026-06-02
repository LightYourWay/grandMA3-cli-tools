// @ts-check

// Post-processes the tstl bundle into the final MA3 plugin:
//   1. patch the __TS__ArrayForEach helper (tstl's version misbehaves under MA3's Lua)
//   2. prepend the project LICENSE as Lua comments
//   3. rename the bundle to <pluginname>.lua and emit the matching <pluginname>.xml

import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const name = pkg.name;

const bundle = 'dist/plugin.lua';

// 1. Patch the array-iteration helper emitted by tstl.
let result = (await readFile(bundle, 'utf8')).replace(
	/function __TS__ArrayForEach(.+\n)+/g,
	`function __TS__ArrayForEach(arr, callbackFn)
	do
		local i = 0
		local arrLength = #arr
		while i < arrLength do
			if arr[i + 1] then
				callbackFn(_G, arr[i + 1], i, arr)
			else
				arrLength = arrLength + 1
			end
			i = i + 1
		end
	end
end\n`,
);

// 1b. Inject the version from package.json.
result = result.replace(/__CLI_TOOLS_VERSION__/g, `v${pkg.version}`);

// 2. Prepend the LICENSE as Lua comments.
const license = (await readFile('src/LICENSE', 'utf8'))
	.split(/\r?\n/)
	.map(
		(line) =>
			`-- ${line.replace('[year]', `${new Date().getFullYear()}`).replace('[fullname]', pkg.author)}`,
	)
	.join('\n');
result = `${license}\n${result}`;

// 3. Write the bundle out under the plugin name and drop the original.
await writeFile(`dist/${name}.lua`, result, 'utf8');
await rm(bundle);

// 4. Emit the plugin XML, pointing Path at the dist location.
const cwd = path.parse(process.cwd());
const buildPath = path.join(cwd.dir, cwd.base, 'dist').replace(/\\/g, '/');

let xmlPath = `/${cwd.base}/dist`;
const inMAStructure = buildPath.includes('MALightingTechnology');
const inPluginsFolder = buildPath.includes('plugins') || buildPath.includes('lib_plugins');
if (inMAStructure && inPluginsFolder) {
	xmlPath = buildPath.replace(/.+?(?:\/plugins|\/lib_plugins)(.+)/g, '$1');
}

await writeFile(
	`dist/${name}.xml`,
	`<?xml version="1.0" encoding="UTF-8"?>
<GMA3 DataVersion="${pkg.gma_version}">
    <Plugin Name="${name}" Version="${pkg.version}" Author="${pkg.author}" Path="${xmlPath}">
        <ComponentLua Name="${name}" FileName="${name}.lua">
        </ComponentLua>
    </Plugin>
</GMA3>
`,
	'utf8',
);

console.log(`Built dist/${name}.lua and dist/${name}.xml`);
