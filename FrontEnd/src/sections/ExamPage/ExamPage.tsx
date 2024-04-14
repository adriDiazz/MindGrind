import { useUser } from "../../context/UserContext";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import Exam from "./Exam";
import ExamListPage from "./ExamList";

const ExamPage = () => {
	const { user } = useUser();

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			<ExamListPage />
		</div>
	);
};

export default ExamPage;
