import { useState } from "react";

import LoginModal from "../Login/LoginModal";
import Button from "./Button";
import ModalComponent from "./ModalComponent";
import styles from "./NavBar.module.scss";

const LINKS = ["Home", "About", "Contact"];

const NavBar = () => {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<nav className={styles.wrapper}>
				<div className={styles.logoWrapper}>
					<img src="/logo.png" alt="" />
					<span>NoteTube</span>
				</div>
				<ul className={styles.navList}>
					{LINKS.map((link) => (
						<li>
							<a href="todo" className={styles.link}>
								{link}
							</a>
						</li>
					))}
				</ul>
				<Button className={styles.button} onClick={() => setOpened(true)}>
					Log in
				</Button>
			</nav>

			<ModalComponent opened={opened} setOpened={setOpened}>
				<LoginModal />
			</ModalComponent>
		</>
	);
};

export default NavBar;
