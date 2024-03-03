import AddIcon from "../Ui/Icons/AddIcon";
import styles from "./Note.module.scss";

function AddNote() {
	return (
		<div className={styles.wrapperAddNote}>
			{/* <img src="addIcon.png" alt="" /> */}
			<AddIcon />
		</div>
	);
}

export default AddNote;
