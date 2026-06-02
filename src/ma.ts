/**
 * The `ma` object is the single entry point for all grandMA3-cli-tools
 * features. It is attached to the global scope at plugin load, so every
 * sub-module is reachable from anywhere (including the MA3 command line via `LUA '<statement>'`) as
 * `ma.<module>.<member>`.
 *
 * @module ma
 */

/** Command-line interface entry point. */
export { cli } from './modules/cli';
/** General-purpose helper functions. */
export * as utils from './modules/utils';
/** UI helpers (popups, dialogs, ...). */
export * as ui from './modules/ui';
/** Operator workflow helpers. */
export * as op from './modules/op';

/** @internal Version of the cli-tools, injected at build time. */
export const cli_tools_version = '__CLI_TOOLS_VERSION__';

/** Prints the version string for MA3, Lua and the cli-tools.
 * @param systemMonitorOnly If true, prints only to the system monitor via Echo. Otherwise, uses Printf which prints to the system monitor and the command line.
 */
export function version(systemMonitorOnly = false) {
	const combinedVersionString =
		'MA3 ' + Version() + ' | ' + _VERSION + ' | grandMA3-cli-tools ' + cli_tools_version;

	if (systemMonitorOnly) Echo(combinedVersionString);
	else Printf(combinedVersionString);
}
