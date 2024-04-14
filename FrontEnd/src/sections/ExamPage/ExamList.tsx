import styles from "./ExamPage.module.scss";

function ExamListPage() {
	return (
		<div className={styles.leftWrapperList}>
			<h1>My exams</h1>
			<div className={styles.examWrapper} style={{ width: "100%" }}>
				<div className={styles.examCardItem}>
					<h3>Exam 1</h3>
					<p>Exam Description</p>
				</div>
				<div className={styles.examCardItem}>
					<h3>Exam 2</h3>
					<p>Exam Description</p>
				</div>
				<div className={styles.examCardItem}>
					<h3>Exam 3</h3>
					<p>Exam Description</p>
				</div>
				<div className={styles.examCardItem}>
					<h3>Exam 4</h3>
					<p>Exam Description</p>
				</div>
			</div>
		</div>
	);
}

export default ExamListPage;
