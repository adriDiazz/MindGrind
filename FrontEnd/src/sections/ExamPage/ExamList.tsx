import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import React, { useEffect, useState } from "react";

import Button from "../Ui/Button";
import ArrowCollapseIcon from "../Ui/Icons/ArrowCollapseIcon";
import styles from "./ExamPage.module.scss";
import { getExams } from "../../services/ExamService";
import { useUser } from "../../context/UserContext";

interface ExamListPageProps {
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExamListPage({ setOpened }: ExamListPageProps) {
	// Estado para controlar la visibilidad de cada examCardItem
	const [collapsed, setCollapsed] = useState({
		1: true,
		2: true,
		3: true,
		4: true,
	});
	const [exams, setExams] = useState([]);
	const { user } = useUser();

	console.log(exams.exams);

	const toggleCollapse = (id: number, event) => {
		// Cambia el estado de colapsado para el id específico
		setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	useEffect(() => {
		getExams(user?.userId).then((exams) => {
			console.log(exams);
			setExams(exams);
		});
	}, [user]);

	return (
		<div className={styles.leftWrapperList}>
			<div className={styles.topTitle}>
				<h1>My exams</h1>
				<Button
					extraStyles={{
						padding: "1rem 2.4rem",
					}}
					onClick={() => setOpened(true)}
				>
					Create
				</Button>
			</div>

			<div className={styles.examWrapper} style={{ width: "100%" }}>
				{exams?.exams?.map((examId) => (
					<div key={examId} className={styles.examCardItem} onClick={() => toggleCollapse(examId)}>
						<div className={styles.examCardItemTop}>
							<h3>Exam</h3>
							<ArrowCollapseIcon
								onClick={(event) => {
									event.stopPropagation();
									toggleCollapse(examId, event);
								}}
								style={{
									transform: !collapsed[examId] ? "rotate(180deg)" : "rotate(0deg)",
									transition: "transform 0.3s ease",
								}}
							/>
						</div>
						{/* Contenido que será colapsable */}
						<div
							style={{ display: collapsed[examId] ? "none" : "flex" }}
							className={styles.uncollapsed}
						>
							<Gauge
								value={75}
								startAngle={-110}
								endAngle={110}
								width={100}
								height={100}
								sx={{
									flexGrow: 0,
									WebkitFlexGrow: 0,
									[`& .${gaugeClasses.valueText}`]: {
										fontSize: 14,
										transform: "translate(0px, 0px)",
									},
									[`& .${gaugeClasses.valueArc}`]: {
										fill: "#5552ff",
									},
									[`& .${gaugeClasses.root}`]: {
										flexGrow: 0,
										WebkitFlexGrow: 0,
									},
								}}
								text={({ value, valueMax }) => `${value} / ${valueMax}`}
							/>
							<div className={styles.examCardItemBottom}>
								<div className="">
									<p>Questions: 10</p>
									<p style={{ marginBottom: 0 }}>Duration: 20 min</p>
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "1rem",
									}}
								>
									<Button
										isWhite
										extraStyles={{
											padding: "0.5rem 0.5rem",
										}}
									>
										Delete exam
									</Button>
									<Button
										extraStyles={{
											padding: "0.5rem 0.5rem",
										}}
									>
										Repeat exam
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExamListPage;
