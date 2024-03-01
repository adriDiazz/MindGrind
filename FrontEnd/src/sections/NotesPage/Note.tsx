import { FC } from "react";

import { Note } from "../../types/types";
import styles from "./Note.module.scss";

interface NoteProps {
	note: Note;
}

const NoteElement: FC<NoteProps> = ({ note }) => {
	return (
		<div className={styles.wrapper}>
			<img src="MockPreview.png" alt="" />
			<div className={styles.bottom}>
				<span>Documento sin titulo</span>
				<span className={styles.date}>
					{new Date().getDay()}/{new Date().getMonth()}/{new Date().getFullYear()}
				</span>
			</div>
		</div>
	);
};

export default NoteElement;
