/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelectedNote } from "../../context/SelectedNoteContext";
import { useUser } from "../../context/UserContext";
import { updateNote } from "../../services/NotesService";
import { Note } from "../../types/types";
import AuthForm from "../Login/AuthForm";
import Button from "./Button";
import EditIcon from "./Icons/EditIcon";
import ModalComponent from "./ModalComponent";
import styles from "./NavBar.module.scss";
import NavMobile from "./NavMobile";

const LINKS = ["Home", "About", "Contact"];

interface props {
	note?: Note;
}

const NavBar: FC<props> = ({
	note = {
		note: "",
		noteId: "",
		isDirectory: false,
		title: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		category: "",
	},
}) => {
	const [opened, setOpened] = useState(false);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [editing, setEditing] = useState(false);
	const [title, setTitle] = useState(note.title);
	const { user, signOut } = useUser();
	const { setSelectedNote } = useSelectedNote();
	const navigate = useNavigate();

	const handleEdit = async () => {
		if (editing) {
			const newNote = { ...note };
			newNote.title = title;
			const response = await updateNote(user?.userId, newNote);
			if (response) {
				setSelectedNote(newNote);
			}
			setEditing(false);
		} else {
			setEditing(true);
		}
	};

	return (
		<>
			<nav className={styles.wrapper}>
				<div className={styles.logoWrapper} onClick={() => navigate("/home")}>
					<img src="/logo.png" alt="" />
					{!note && <span>NoteTube</span>}
				</div>

				{note.noteId !== "" && (
					<div className={styles.noteWrapper}>
						<div className={styles.bottom}>
							{editing && (
								<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
							)}
							{!editing && <span>{note?.title}</span>}
							<div className={styles.editIcon} onClick={() => void handleEdit()}>
								<EditIcon />
							</div>
						</div>
					</div>
				)}
				<img
					src="/navMobile.png"
					alt=""
					className={styles.navMobile}
					onClick={() => {
						setShowMobileNav(!showMobileNav);
					}}
				/>
				{note.noteId === "" && (
					<ul className={styles.navList}>
						{LINKS.map((link) => (
							<li key={link}>
								<a href="todo" className={styles.link}>
									{link}
								</a>
							</li>
						))}
					</ul>
				)}

				{user && note.noteId === "" && (
					<Button
						className={`${styles.button} ${styles.navbtn}`}
						onClick={() => signOut()}
						id="navbtn"
					>
						Log Out
					</Button>
				)}

				{!user && note.noteId === "" && (
					<Button
						className={`${styles.button} ${styles.navbtn}`}
						onClick={() => setOpened(true)}
						id="navbtn"
					>
						Log in
					</Button>
				)}
			</nav>
			{showMobileNav && <NavMobile LINKS={LINKS} />}
			<ModalComponent opened={opened} setOpened={setOpened}>
				<AuthForm />
			</ModalComponent>
		</>
	);
};

export default NavBar;
