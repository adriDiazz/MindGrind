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
				<span className={styles.date}>
					{new Date(note.createdAt).getDay()}/{new Date(note.createdAt).getMonth()}/
					{new Date(note.createdAt).getFullYear()}
				</span>
			</div>
		</div>
	);
};

export default NoteElement;
