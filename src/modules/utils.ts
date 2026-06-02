export function dump(o: any): string {
	if (type(o) === 'table') {
		let s = '{ ';
		for (let [k, v] of pairs(o)) {
			if (type(k) !== 'number') {
				k = '"' + (k as string) + '"';
			}
			s += '[' + (k as string) + '] = ' + dump(v) + ',';
		}
		return s + '} ';
	} else {
		return tostring(o);
	}
}

export function findSequence(identifier: number | string) {
	return DataPool().Sequences[identifier];
}

export function findCue(sequence: Sequence, identifier: number | string) {
	return sequence[identifier];
}
