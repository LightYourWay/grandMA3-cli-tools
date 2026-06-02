import * as maModule from './ma';

// expose ma as a global object so every sub-module is reachable from anywhere
// (including the MA3 command line) as ma.<module>.<member>.
//
// NOTE: build a fresh table here instead of `ma = maModule`. Assigning the
// bundled module's export table directly makes the global alias the bundler's
// internal require-cache entry, which the MA3 plugin sandbox does not expose as
// a usable global. A plain table behaves identically to the original code.
declare global {
	var ma: typeof maModule;
}
ma = { ...maModule };

// ****************************************************************
// plugin load entry point
// ****************************************************************
function Load() {
	Echo(`grandMA3-cli-tools have been loaded...`);
	ma.version(true);
}

Load();

// ****************************************************************
// plugin main entry point
// ****************************************************************
function Main(display_handle: number, argument: any) {
	Printf(ma.version());
}

// ****************************************************************
// plugin exit cleanup entry point
// ****************************************************************
function Cleanup() {}

// ****************************************************************
// plugin execute entry point
// ****************************************************************
function Execute(Type: string, ...args: any[]) {}

export = [Main, Cleanup, Execute];
