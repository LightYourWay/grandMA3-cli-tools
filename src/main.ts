// make ma a globally avaliable variable
declare var ma: any;
ma = {};

// import cli and make cmds a globally avaliable subdomain of ma
import { cli } from './modules/cli';
ma.cli = cli;

// import utils and hooking them into the global ma variable
import * as utils from './modules/utils';
ma.utils = utils;

// import ui and hooking them into the global ma variable
import * as ui from './modules/ui';
ma.ui = ui;

// import op and hooking them into the global ma variable
import * as op from './modules/op';
ma.op = op;

// version functions
ma.cli_tools_version = '__CLI_TOOLS_VERSION__';
ma.version = () => {
	return 'MA3 ' + Version() + ' | ' + _VERSION + ' | grandMA3-cli-tools ' + ma.cli_tools_version;
};

// ****************************************************************
// plugin load entry point
// ****************************************************************
function Load() {
	Echo(`grandMA3-cli-tools have been loaded...`);
	Echo(ma.version());
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
