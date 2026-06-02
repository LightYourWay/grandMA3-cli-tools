# grandMA3 CLI Tools

:warning: **OPEN ALPHA** &rarr; software is not showready yet

a feature rich utility for MA3 to allow operators to take advantage of LUA easily.

## installation

The very limited featureset of the plugin can be directly installed and tested by grandMA3 operators. Just head over the [Releases Page](https://github.com/LightYourWay/grandma3-cli-tools/releases) and download it from there. Developers can `git clone` this repository and transpile the plugin by themselves. - _see [#developers](#developers)_

## usage / possible future featureset

- `ma.cli` - commandline tools to navigate the consoles cli easily
  - `ma.cli()` - opens text input and asks for cmd
  - `ma.cli("cd /")` - parses input and executes the `grandma3-cli-tools` function
  - `ma.cli{"Printf", Version()}` - directly executes the `grandma3-cli-tools` function
  - `ma.cli(true)` - opens popup over and over
  - `ma.cli("Fixture 1")` - selects Fixture 1
- `ma.ui` - UI Tools to build great user experiences with e.g. Layout Views
  - `ma.ui.gotoSequ(display_handle, 1)` - spawns Goto Popup for Sequ 1
- `ma.op` - easy to integrate tools for MA3 Operators
- `ma.cfg` - configuration helper functions _(not developed yet)_
- `ma.utils` - generic helper ulilities mostly for internal use
  - `ma.utils.dump(table)` - returns string to allow for printing tables
- `ma.loop` - a main event loop kind of aproach to hook functions into for repeated execution. _(not developed yet)_

## developers

### prerequisites

The dependencies can be either installed by `npm install`ing them or `git clone`d and `npm link`ed manually to also be able to incorporate changes in those dependencies. To make `grandma3-cli-tools` work, you need

- [grandMA3-types](https://github.com/LightYourWay/grandMA3-types) - TypeScript definitions for the grandMA3 Lua API
- [grandMA3-tstl-plugin](https://github.com/LightYourWay/grandMA3-tstl-plugin) - a TypeScriptToLua plugin that allows for direct export to grandMA3 compatible Lua files

as well as `grandma3-cli-tools` itself. After installing the project with `npm install` you can optionally link `grandMA3-types` and `grandMA3-tstl-plugin` to your project via [`npm link`](https://docs.npmjs.com/cli/v6/commands/npm-link).

### transpile

```sh
npm run build
```

### import to MA3

As long as the plugin development folder is located in the `lib_plugins` folder of grandMA3 the plugin can directly be imported like so: [![How to import the plugin](https://i.imgur.com/1zJvKD5.png)](https://i.imgur.com/1zJvKD5.png)

## Bugs, Missing Features & Ideas

- [ ] :bulb: thousand ideas for the plugin are on the horizon &rarr; share yours by creating a GitHub issue or collaborating on the project!
  <!-- - [ ] :bug: **BUG DESCRIPTION** &rarr; SOLUTION -->
  <!-- - [ ] :sparkles: MISSING FEATURE -->
  <!-- - [ ] :bulb: IDEA -->

## License

Copyright (C) Lukas Runge Veranstaltungstechnik

This project is licensed under the GNU Lesser General Public License v3.0 or later (LGPL-3.0-or-later). See [COPYING.LESSER](COPYING.LESSER) and [COPYING](COPYING) for the full license texts.
