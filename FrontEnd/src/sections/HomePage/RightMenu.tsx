import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { userType } from "../../context/UserContext";
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
						<img src="/home.png" alt="home" />
						<span>Home</span>
					</div>
					<img src="/arrow.png" alt="" />
				</div>
				<div
					className={styles.section}
					onClick={() => {
						navigate("/notes");
					}}
				>
					<div className={styles.left}>
						<img src="/notes.png" alt="home" />
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
