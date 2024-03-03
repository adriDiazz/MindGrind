import { userType } from "../context/UserContext";
import { ResponseApi } from "../sections/HomePage/HomePage";

export interface Note {
	note: string;
	noteId: string;
	isDirectory: boolean;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	category: string;
}

export interface NoteResponse {
	userId: string;
	notes: Note[];
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateNoteType {
	data: ResponseApi | undefined;
	user: userType | null;
}
