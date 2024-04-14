import { useUser } from "../../context/UserContext";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import Exam from "./Exam";

const ExamPage = () => {
	const { user } = useUser();

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			<Exam />
		</div>
	);
};

export default ExamPage;
