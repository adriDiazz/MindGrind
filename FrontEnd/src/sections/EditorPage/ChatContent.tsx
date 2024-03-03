import { FC, useEffect, useState } from "react";

import CrossIcon from "../Ui/Icons/CrossIcon";
import SendIcon from "../Ui/Icons/SendIcon";
import styles from "./Chat.module.scss";

interface ChatMessageProps {
	setActiveChat: (activeChat: boolean) => void;
	activeChat: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ activeChat, setActiveChat }) => {
	const [messages, setMessages] = useState([
		{ text: "Hola", isSent: true },
		{ text: "Hola, ¿cómo estás?", isSent: false },
		// Agrega más mensajes aquí
	]);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 200); // espera 1 segundo antes de mostrar el componente

		return () => clearTimeout(timer); // limpia el temporizador si el componente se desmonta
	}, []);

	return (
		<div className={`${styles.chatWrapper} ${isVisible ? styles.visible : ""}`}>
			<div className={styles.chatHeader}>
				<h2>GPT Chat</h2>
				<button onClick={() => setActiveChat(false)}>
					<CrossIcon />
				</button>
			</div>
			<div className={styles.chatContent}>
				{messages.map((message, index) => (
					<div key={index} className={message.isSent ? styles.sentMessage : styles.receivedMessage}>
						{message.text}
					</div>
				))}
			</div>
			<div className={styles.chatFooter}>
				<input type="text" placeholder="Type a message" />
				<button>
					<SendIcon />
				</button>
			</div>
		</div>
	);
};

export default ChatMessage;
