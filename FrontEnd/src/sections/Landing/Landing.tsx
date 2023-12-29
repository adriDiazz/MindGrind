import Button from "../Ui/Button";
import styles from "./Landing.module.scss";
import TierCard from "./TierCard";

const Landing = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.innerWrapper}>
					<div className={styles.rightWrapper}>
						<h1>
							A Better Way To <br />
							<span>Keep Productive</span>
						</h1>
						<p>
							Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
							<br />
							Lorem Ipsum ha sido el texto de relleno estándar de
						</p>
						<div className={styles.btnWrapper}>
							<Button>Register</Button>
							<Button isWhite>Log in</Button>
						</div>
					</div>
					<img src="/imageVr.png" alt="" />
				</div>
			</div>
			<div className={styles.banner}>
				<h1>A Better Way To</h1>
				<img src="/Star.png" alt="" />
				<h1>Keep Productive</h1>
			</div>
			<div className={styles.tierWrapper}>
				<h2>A Perfect Tool For Everyone</h2>
				<div className={styles.cardWrapper}>
					<TierCard color="green" />
					<TierCard color="blue" />
					<TierCard color="purple" />
				</div>
			</div>

			<div className={styles.iaWrapper}>
				<div className={styles.text}>
					<h2>Create with AI</h2>
					<p>
						Revoluciona tu forma de crear contenido con Estudio Mágico, nuestro paquete de
						herramientas con IA. Genera texto con la voz de tu marca usando Escritura Mágica o
						transforma tus fotos con Edición Mágica.
					</p>
				</div>
				<div className={styles.imgWrapper}>
					<img src="/iaImage.png" alt="" className={styles.img} />
				</div>
			</div>
		</>
	);
};

export default Landing;
