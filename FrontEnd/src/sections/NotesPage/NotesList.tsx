/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { FC } from "react";

import { NoteResponse } from "../../types/types";
import AddNote from "./AddNote";
import NoteElement from "./Note";
import styles from "./NotesList.module.scss";

interface props {
	note: NoteResponse;
}

const NotesList: FC<props> = ({ note }) => {
	// eslint-disable-next-line no-console, @typescript-eslint/no-unnecessary-condition
	const notes = note.notes;

	return (
		<div className={styles.rightWrapper}>
			<div className={styles.notesWrapper}>
				<AddNote />
				{notes?.map((note) => (
					<NoteElement note={note} key={note.noteId} />
				))}
			</div>
		</div>
	);
};

export default NotesList;
