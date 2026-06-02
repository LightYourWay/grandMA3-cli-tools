const { once } = require('events');
const { createInterface } = require('readline');
const path = require('path');
const pjson = require('./package.json');
const fs = require('fs');

var filename = `dist/plugin.lua`;
fs.readFile(filename, 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	var result = data.replace(
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

	let license = [];

	(async function processLineByLine() {
		try {
			const rl = createInterface({
				input: fs.createReadStream('src/LICENSE'),
				crlfDelay: Infinity,
			});

			rl.on('line', (line) => {
				line = line.replace('[year]', new Date().getFullYear());
				line = line.replace('[fullname]', pjson.author);
				license.push(`-- ${line}`);
			});

			await once(rl, 'close');

			result = license.join(`\n`) + '\n' + result;

			fs.writeFile(filename, result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			fs.rename(`dist/plugin.lua`, `dist/${process.env.npm_package_name}.lua`, function (err) {
				if (err) return console.log(err);
			});

			const execPath = path.parse(process.cwd());
			const buildPath = path.join(execPath.dir, execPath.base, 'dist').replace(/\\/g, '/');

			var xmlPath = `/${execPath.base}/dist`;

			const isInMAFolderStructure = buildPath.includes('MALightingTechnology');
			const isInPluginsFolder = buildPath.includes('plugins') || buildPath.includes('lib_plugins');
			if (isInMAFolderStructure && isInPluginsFolder) {
				xmlPath = buildPath.replace(/.+?(?:\/plugins|\/lib_plugins)(.+)/g, '$1');
			}

			fs.writeFile(
				`dist/${process.env.npm_package_name}.xml`,
				`<?xml version="1.0" encoding="UTF-8"?>
<GMA3 DataVersion="${pjson.gma_version}">
    <Plugin Name="${process.env.npm_package_name}" Version="${process.env.npm_package_version}" Author="${pjson.author}" Path="${xmlPath}">
        <ComponentLua Name="${process.env.npm_package_name}" FileName="${process.env.npm_package_name}.lua">
        </ComponentLua>
    </Plugin>
</GMA3>
`,
				`utf8`,
				function (err) {
					if (err) return console.log(err);
				},
			);
		} catch (err) {
			console.error(err);
		}
	})();
});
