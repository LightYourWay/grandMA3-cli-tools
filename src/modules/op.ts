import { findCue, findSequence } from './utils';

export function createNewPart(
	sequence: number | string,
	cue: number | string,
	user: any,
	description?: string,
) {
	if (description) {
		// list all Parts of User and allow to choose existing
	}

	// find next free part
	let mySequence = findSequence(sequence) as Sequence;
	let myCue = findCue(mySequence, cue) as Cue;
	let myPart = myCue.Create(myCue.Children().length + 1) as Part;
	myPart.name = 'myNewPart';

	// store
	myPart.CommandStore();
}
