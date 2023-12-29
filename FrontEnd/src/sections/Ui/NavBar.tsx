import Button from "./Button";
import styles from "./NavBar.module.scss";

const LINKS = ["Home", "About", "Contact"];

const NavBar = () => {
	return (
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
			<Button className={styles.button}>Log in</Button>
		</nav>
	);
};

export default NavBar;
