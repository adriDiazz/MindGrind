import { FC, useState } from "react";

import { useUser } from "../../context/UserContext";
import { updateNote } from "../../services/NotesService";
import { Note } from "../../types/types";
import Button from "../Ui/Button";
import styles from "./ModalChangeTitle.module.scss";

interface ModalChangeTitleProps {
	note: Note;
}

const ModalChangeTitle: FC<ModalChangeTitleProps> = ({ note }) => {
	const { user } = useUser();
	const [title, setTitle] = useState("");

	const handelSave = async () => {
		const newNote = { ...note };
		newNote.title = title;
		const response = await updateNote(user?.userId, newNote);
	};

	return (
		<div className={styles.wrapper}>
			<h1>Change Title</h1>
			<input
				type="text"
				placeholder="Enter new title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<div className={styles.btnWrapper}>
				<Button isWhite>Cancel</Button>
				<Button onClick={handelSave}>Save</Button>
			</div>
		</div>
	);
};

export default ModalChangeTitle;
