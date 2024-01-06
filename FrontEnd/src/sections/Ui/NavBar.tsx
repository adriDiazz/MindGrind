import { useState } from "react";

import { useUser } from "../../context/UserContext";
import AuthForm from "../Login/AuthForm";
import Button from "./Button";
import ModalComponent from "./ModalComponent";
import styles from "./NavBar.module.scss";
import NavMobile from "./NavMobile";

const LINKS = ["Home", "About", "Contact"];

const NavBar = () => {
	const [opened, setOpened] = useState(false);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const { user, signOut } = useUser();

	return (
		<>
			<nav className={styles.wrapper}>
				<div className={styles.logoWrapper}>
					<img src="/logo.png" alt="" />
					<span>NoteTube</span>
				</div>
				<img
					src="/navMobile.png"
					alt=""
					className={styles.navMobile}
					onClick={() => {
						setShowMobileNav(!showMobileNav);
					}}
				/>
				<ul className={styles.navList}>
					{LINKS.map((link) => (
						<li key={link}>
							<a href="todo" className={styles.link}>
								{link}
							</a>
						</li>
					))}
				</ul>
				{user ? (
					<Button
						className={`${styles.button} ${styles.navbtn}`}
						onClick={() => signOut()}
						id="navbtn"
					>
						Log Out
					</Button>
				) : (
					<Button
						className={`${styles.button} ${styles.navbtn}`}
						onClick={() => setOpened(true)}
						id="navbtn"
					>
						Log in
					</Button>
				)}
			</nav>
			{showMobileNav && <NavMobile LINKS={LINKS} />}
			<ModalComponent opened={opened} setOpened={setOpened}>
				<AuthForm />
			</ModalComponent>
		</>
	);
};

export default NavBar;
