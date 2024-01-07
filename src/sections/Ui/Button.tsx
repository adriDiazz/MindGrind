import style from "./Button.module.scss";

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
	isWhite?: boolean;
	id?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ className = "", isWhite, id, type, ...props }) => {
	return (
		<button
			{...props}
			id={id}
			type={type}
			className={`${isWhite ? style.buttonWhite : ""}  ${
				!isWhite ? style.button : ""
			} ${className}                     
    `}
		></button>
	);
};

export default Button;
