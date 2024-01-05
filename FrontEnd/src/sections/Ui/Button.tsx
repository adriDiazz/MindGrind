import style from "./Button.module.scss";

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
	isWhite?: boolean;
	id?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className = "", isWhite, id, ...props }) => {
	return (
		<button
			{...props}
			id={id}
			className={`${isWhite ? style.buttonWhite : ""}  ${
				!isWhite ? style.button : ""
			} ${className}                     
    `}
		></button>
	);
};

export default Button;
