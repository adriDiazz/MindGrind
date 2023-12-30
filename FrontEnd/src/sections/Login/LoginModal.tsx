import styles from "./LoginModal.module.scss";

const LoginModal = () => {
	return (
		<div className={styles.container}>
			<span>
				Welcome to <span>NoteTube</span>
			</span>
			<h3>Sign in</h3>

			<form action="" className={styles.form}>
				<label htmlFor="">Enter your username or email address</label>
				<input type="text" placeholder="Email" />
				<label htmlFor="">Enter your Password</label>
				<input type="password" placeholder="Password" />
				<div className={styles.text}>
					<span>
						No Account ? <span>Sign up</span>
					</span>
					<span>Forgot Password</span>
				</div>
				<div className={styles.btnWrapper}>
					<button className={styles.button}>Sign in</button>
					<button className={styles.buttonGoogle}>
						<img src="/google.png" alt="google.png" />
						Sign in with Google
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginModal;
