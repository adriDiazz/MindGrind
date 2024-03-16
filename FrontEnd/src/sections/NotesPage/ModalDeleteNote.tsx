import Button from "../Ui/Button";
import styles from "./ModalChangeTitle.module.scss";

const ModalDeleteNote = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Delete Note?</h1>
			<div className={styles.btnWrapper}>
				<Button isWhite>Cancel</Button>
				<Button>Delete</Button>
			</div>
		</div>
	);
};

export default ModalDeleteNote;
