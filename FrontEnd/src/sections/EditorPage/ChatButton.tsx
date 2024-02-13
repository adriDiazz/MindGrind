import { motion } from "framer-motion";
import { FC } from "react";

import styles from "./Chat.module.scss";

interface ChatMessageProps {
	setActiveChat: (activeChat: boolean) => void;
}

const ChatButton: FC<ChatMessageProps> = ({ setActiveChat }) => {
	return (
		<div className={styles.btnWrapper}>
			<motion.div transition={{ type: "spring", stiffness: 50, damping: 50 }}>
				<button
					className={styles.chatButton}
					onClick={() => {
						setActiveChat(true);
					}}
				>
					<img src="./chatIcon.png" alt="" />
				</button>
			</motion.div>
		</div>
	);
};

export default ChatButton;
