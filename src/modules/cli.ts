type Callable = (this: void, ...args: any[]) => any;

const callable_G = globalThis as unknown as { [key: string]: Callable };

let functions: { [key: string]: Callable } = {
	ls: () => {
		Cmd('list');
	},
	cd: (folder: string) => {
		if (!folder) {
			Cmd('list');
		} else if (folder == '/') {
			Cmd('cd Root');
		} else {
			Cmd('cd ' + folder);
		}
	},
};

function execute(cmd: string[]): boolean | undefined {
	let func = cmd.shift();
	if (func) {
		if (func == 'exit') {
			return true;
		} else if (functions[func]) {
			Printf('grandMA3-cli-tools:' + func + ' ' + cmd.join(' '));
			functions[func](...cmd);
		} else if (callable_G[func]) {
			Printf('grandMA3 Lua API: ' + func + ' ' + cmd.join(' '));
			callable_G[func](...cmd);
		} else {
			Printf('grandMA3 CLI: ' + func + ' ' + cmd.join(' '));
			Cmd(func + ' ' + cmd.join(' '));
		}
	}
}

export function cli(...user_input: any): void {
	if (!user_input[1]) {
		let result = TextInput('CMD');
		execute(result.split(' '));
	} else if (user_input[1] == true) {
		while (true) {
			let result = TextInput('CMD');
			if (execute(result.split(' '))) return;
		}
	} else if (type(user_input[1]) == 'string') {
		execute((user_input[1] as string).split(' '));
	} else if (type(user_input[1]) == 'table') {
		execute(user_input[1] as string[]);
	}
}
