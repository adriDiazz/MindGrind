import styles from "./Note.module.scss";

function AddNote() {
	return (
		<div className={styles.wrapperAddNote}>
			<img src="addIcon.png" alt="" />
		</div>
	);
}

export default AddNote;
