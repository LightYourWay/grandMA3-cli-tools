// @ts-check

// Packages the built plugin into a release zip.
//
//   node package.mjs [version]
//
// Every dist file is placed inside a "<pluginname>/" folder within the zip, so
// the plugin extracts into a folder named after itself. The XML import Path is
// rewritten to "/<pluginname>" to match that location.
//
// Version defaults to the package.json version (prefixed with "v"); pass an
// explicit version argument to override it (e.g. the git tag in CI).

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { zipSync } from 'fflate';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const name = pkg.name;
const version = process.argv[2] ?? `v${pkg.version}`;

const distDir = 'dist';
const releaseDir = 'release';
const zipName = path.join(releaseDir, `${name}-${version}.zip`);

// Collect dist files into "<name>/<file>" zip entries.
/** @type {Record<string, Uint8Array>} */
const entries = {};
for (const file of await readdir(distDir)) {
	let data = await readFile(path.join(distDir, file));
	// Point the XML import Path at the folder the plugin extracts into.
	if (file === `${name}.xml`) {
		data = Buffer.from(data.toString('utf8').replace(/Path="[^"]*"/, `Path="/${name}"`), 'utf8');
	}
	entries[`${name}/${file}`] = data;
}

// Include the README so the release zip is self-documenting.
entries[`${name}/README.md`] = await readFile('README.md');

const zipped = zipSync(entries, { level: 9 });

await mkdir(releaseDir, { recursive: true });
await writeFile(zipName, zipped);

console.log(`Created ${zipName}`);
