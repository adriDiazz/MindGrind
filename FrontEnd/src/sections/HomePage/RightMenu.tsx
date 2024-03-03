import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { userType } from "../../context/UserContext";
import ArrowIcon from "../Ui/Icons/ArrowIcon";
import HomeIcon from "../Ui/Icons/HomeIcon";
import NotesIcon from "../Ui/Icons/NotesIcon";
import styles from "./HomePage.module.scss";

interface User {
	user: userType | null;
}

const LeftMenu: FC<User> = ({ user }) => {
	const navigate = useNavigate();

	return (
		<div className={styles.rightMenuWrapper}>
			<div className={styles.profileWrapper}>
				<img src="/profile.png" alt="defaultProfileImage" />
				<span>{user?.username}</span>
			</div>
			<div className={styles.sectionsWrapper}>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/home");
					}}
				>
					<div className={styles.left}>
						<HomeIcon />
						<span>Home</span>
					</div>
					<ArrowIcon />
				</div>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/notes");
					}}
				>
					<div className={styles.left}>
						<NotesIcon />
						<span>Notes</span>
					</div>
					<img src="/arrow.png" alt="" />
				</div>
			</div>
			<div className={styles.moreMin}>
				<span>More minutes?</span>
				<img src="/starY.png" alt="" />
			</div>
			<button className={styles.btn}>Log Out</button>
		</div>
	);
};

export default LeftMenu;
