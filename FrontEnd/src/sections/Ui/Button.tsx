import style from "./Button.module.scss";

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
	isWhite?: boolean;
}

const Button: React.FC<ButtonProps> = ({ className = "", isWhite, ...props }) => {
	return (
		<button
			{...props}
			className={`${isWhite ? style.buttonWhite : ""}  ${
				!isWhite ? style.button : ""
			} ${className}                     
    `}
		></button>
	);
};

export default Button;
