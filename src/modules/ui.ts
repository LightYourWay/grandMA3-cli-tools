export function gotoSequ(display_handle: number, Sequ: number): void {
	let Sequence = DataPool().Sequences[Sequ];
	if (Sequence && Sequence.GetClass() == 'Sequence') {
		let items: string[] = [];
		Sequence.Children().forEach((Cue) => {
			items.push(Cue.name);
		});

		let preselectedItem = '';
		let currentCue = Sequence.CurrentChild();
		if (currentCue) {
			preselectedItem = currentCue.name;
		}
		let title = Sequence.name;
		let [selectedIndex, selectedValue] = PopupInput({
			title: title,
			caller: GetDisplayByIndex(display_handle),
			items: items,
			selectedValue: preselectedItem,
		});
		if (selectedIndex !== 0) {
			Cmd(`Goto Sequence ${Sequence.Index()} Cue ${selectedValue}`);
		} else {
			Echo('Goto canceled by user');
		}
	} else {
		Echo('Cannot perform goto, no sequence is selected');
	}
}
