import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Exam } from "../../types/types";
import styles from "./ExamPage.module.scss";
import ExamQuestion from "./ExamQuestion";
import Button from "../Ui/Button";

function ExamComponent() {
	const { state } = useLocation();
	const exams = JSON.parse(state?.exam.content) as Exam;

	const [timer, setTimer] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTime) => prevTime + 1);
		}, 1000);

		return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
	}, []);

	// Función para convertir segundos a formato minutos:segundos
	const formatTime = (totalSeconds) => {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		// Formatea los minutos y segundos para asegurar dos dígitos
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// Array para rastrear las preguntas respondidas, inicializado en false
	const [answeredQuestions, setAnsweredQuestions] = useState(
		Array(exams.questions.length).fill(false)
	);

	const setAnswered = (index) => {
		setAnsweredQuestions((prev) => {
			const newAnswers = [...prev];
			if (!newAnswers[index]) {
				newAnswers[index] = true;

				return newAnswers;
			}

			return prev;
		});
	};

	// Contar las respuestas
	const answeredCount = answeredQuestions.filter(Boolean).length;

	return (
		<div className={styles.leftWrapper}>
			<div className={styles.examTopBar}>
				<h2>{state.exam.title}</h2>
				<p>Answered Questions: {answeredCount}</p>
				<p>Timer: {formatTime(timer)}</p>{" "}
				<Button extraStyles={{ padding: "0.5rem 1rem" }}>Submit</Button>
			</div>
			{exams.questions.map((question, index) => (
				<ExamQuestion
					key={index}
					question={question}
					index={index}
					setAnswered={() => setAnswered(index)}
				/>
			))}
		</div>
	);
}

export default ExamComponent;
