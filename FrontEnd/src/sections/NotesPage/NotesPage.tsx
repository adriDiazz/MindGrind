import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { NoteResponse } from "../../types/types";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import NotesList from "./NotesList";

const NotesPage = () => {
	const { user } = useUser();
	const navigate = useNavigate();
	const [notes, setNotes] = useState<NoteResponse>({} as NoteResponse);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				if (!user) {
					navigate("/");
				} else {
					const response = await fetch(`${String(import.meta.env.VITE_API_NOTES)}${user.userId}`); // Ajusta la URL de la API según tu backend
					if (!response.ok) {
						throw new Error("Failed to fetch notes");
					}
					const data = (await response.json()) as NoteResponse;
					setNotes(data);
				}
			} catch (error) {
				console.error("Error fetching notes:", error);
			}
		};

		void fetchNotes();
	}, [user]);

	if (!user) {
		navigate("/");
	}

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			<NotesList note={notes} />
		</div>
	);
};

export default NotesPage;
