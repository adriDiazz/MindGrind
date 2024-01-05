import { useState } from "react";

import styles from "./LoginModal.module.scss";

const LoginModal = () => {
	const [registermode, setRegistermode] = useState(false);

	return (
		<div className={styles.container}>
			<span>
				Welcome to <span>NoteTube</span>
			</span>
			<h3>{registermode ? "Create your account" : "Sign in"}</h3>

			<form action="" className={styles.form}>
				<label htmlFor="">Enter your email address</label>
				<input type="text" placeholder="Email" />
				<label htmlFor="">Enter your Password</label>
				<input type="password" placeholder="Password" />
				{registermode && (
					<>
						<label htmlFor="">Confirm your Password</label>
						<input type="password" placeholder="Confirm Password" />
					</>
				)}

				<div className={styles.text}>
					<span
						onClick={() => {
							setRegistermode(!registermode);
						}}
					>
						{registermode ? "Already have an account ?" : "Don't have an account ?"}
						<span>Sign {registermode ? "in" : "up"}</span>
					</span>
					<span>Forgot Password</span>
				</div>
				<div className={styles.btnWrapper}>
					<button className={styles.buttonGoogle}>Sign in</button>
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
