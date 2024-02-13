import { FC } from "react";

import { userType } from "../../context/UserContext";
import styles from "./HomePage.module.scss";

interface User {
	user: userType | null;
}

const RightMenu: FC<User> = ({ user }) => {
	return (
		<div className={styles.rightMenuWrapper}>
			<div className={styles.profileWrapper}>
				<img src="/profile.png" alt="defaultProfileImage" />
				<span>{user?.username}</span>
			</div>
			<div className={styles.sectionsWrapper}>
				<div className={styles.section}>
					<div className={styles.left}>
						<img src="/home.png" alt="home" />
						<span>Home</span>
					</div>
					<img src="/arrow.png" alt="" />
				</div>
				<div className={styles.section}>
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

export default RightMenu;
