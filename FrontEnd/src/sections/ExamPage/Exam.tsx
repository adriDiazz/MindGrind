import styles from "./ExamPage.module.scss";
import ExamQuestion from "./ExamQuestion";

function Exam() {
	return (
		<div className={styles.leftWrapper}>
			<h1>Exam Page</h1>
			<ExamQuestion />
			<ExamQuestion />
			<ExamQuestion />
			<ExamQuestion />
		</div>
	);
}

export default Exam;
