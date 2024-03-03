import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { Note } from "../../types/types";
import styles from "./Note.module.scss";

interface NoteProps {
	note: Note;
}

const NoteElement: FC<NoteProps> = ({ note }) => {
	const navigate = useNavigate();
	const { user } = useUser();
	const fecha = new Date(note.createdAt);
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1;
	const año = fecha.getFullYear();

	return (
		<div
			className={styles.wrapper}
			onClick={() => {
				navigate(`/notes/${note.noteId}`, {
					state: { data: { chatGptNotes: note.note }, user },
				});
			}}
		>
			<img src="MockPreview.png" alt="" />
			<div className={styles.bottom}>
				<span>{note.title}</span>
				<span className={styles.date}>{`${dia}/${mes}/${año}`}</span>
			</div>
		</div>
	);
};

export default NoteElement;
