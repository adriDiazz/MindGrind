import { FC } from "react";

import { Question } from "../../types/types";
import styles from "./ExamPage.module.scss";

interface ExamQuestionProps {
	question: Question;
	index: number;
	setAnswered: () => void;
}

const ExamQuestion: FC<ExamQuestionProps> = ({ question, index, setAnswered }) => {
	return (
		<div className={styles.examCard}>
			<div className={styles.title}>
				<h2 style={{ margin: "0" }}>{index + 1}-</h2>
				<h3>{question.question}</h3>
			</div>
			<div className={styles.options}>
				{question.options.map((option, optionIndex) => (
					<div key={optionIndex} className={styles.option}>
						<label htmlFor={`option-${index}-${optionIndex}`}>
							<input
								type="radio"
								name={`question-${index}-option`}
								id={`option-${index}-${optionIndex}`}
								value={option}
								onChange={setAnswered} // Llamar a setAnswered cuando se cambia la selección
							/>
							{option}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExamQuestion;
