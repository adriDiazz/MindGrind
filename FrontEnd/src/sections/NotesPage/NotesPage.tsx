import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { NoteResponse } from "../../types/types";
import styles from "../HomePage/HomePage.module.scss";
import LeftMenu from "../HomePage/RightMenu";
import Loader from "../Ui/Loader";
import NotesList from "./NotesList";

const NotesPage = () => {
	const { user } = useUser();
	const navigate = useNavigate();
	const [notes, setNotes] = useState<NoteResponse>({} as NoteResponse);
	const [loading, setLoading] = useState(true);

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
					setLoading(false);
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
			{!loading ? <NotesList note={notes} /> : <Loader />}
		</div>
	);
};

export default NotesPage;
