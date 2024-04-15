import { useNotes } from "../../context/NoteContext";
import Button from "../Ui/Button";
import styles from "./ModalCreateExam.module.scss";

const ModalCreateExam = () => {
	const { notes } = useNotes();

	return (
		<div className={styles.wrapper}>
			<h1>Select note</h1>
			<select name="" id="">
				{notes.map((note) => (
					<option key={note.noteId} value={note.noteId}>
						{note.title}
					</option>
				))}
			</select>
			<div className={styles.btnWrapper}>
				<Button isWhite>Cancel</Button>
				<Button>Create</Button>
			</div>
		</div>
	);
};

export default ModalCreateExam;
