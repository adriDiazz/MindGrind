import styles from "./ExamPage.module.scss";

const ExamQuestion = () => {
	const handleOptionChange = (event) => {
		console.log("Opción seleccionada:", event.target.value);
	};

	const handleClick = (inputId) => {
		document.getElementById(inputId).click();
	};

	return (
		<div className={styles.examCard}>
			<div className={styles.title}>
				<h2 style={{ margin: "0" }}>1-</h2>
				<h3>Pregunta de examen 1</h3>
			</div>
			<div className={styles.options}>
				<div className={styles.option} onClick={() => handleClick("option1")}>
					<label htmlFor="option1">
						<input
							type="radio"
							name="option"
							id="option1"
							value="Opción 1"
							onChange={handleOptionChange}
						/>
						Opción 1
					</label>
				</div>
				<div className={styles.option} onClick={() => handleClick("option2")}>
					<label htmlFor="option2">
						<input
							type="radio"
							name="option"
							id="option2"
							value="Opción 2"
							onChange={handleOptionChange}
						/>
						Opción 2
					</label>
				</div>
				<div className={styles.option} onClick={() => handleClick("option3")}>
					<label htmlFor="option3">
						<input
							type="radio"
							name="option"
							id="option3"
							value="Opción 3"
							onChange={handleOptionChange}
						/>
						Opción 3
					</label>
				</div>
				<div className={styles.option} onClick={() => handleClick("option4")}>
					<label htmlFor="option4">
						<input
							type="radio"
							name="option"
							id="option4"
							value="Opción 4"
							onChange={handleOptionChange}
						/>
						Opción 4
					</label>
				</div>
			</div>
		</div>
	);
};

export default ExamQuestion;
