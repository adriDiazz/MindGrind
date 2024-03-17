/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CreateNoteType, Note, NoteResponse } from "../types/types";

export const createNote = (note: CreateNoteType): Promise<void | NoteResponse> => {
	return fetch(`${String(import.meta.env.VITE_API_SAVE)}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			note: note.data?.chatGptNotes,
			userId: note.user?.userId,
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => {
			return data as NoteResponse;
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log(error);
		});
};

export const getLastModifiedNotes = async (userId: string): Promise<Note[]> => {
	try {
		const lastNotes = await fetch(`${String(import.meta.env.VITE_API_LAST_NOTES)}/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = (await lastNotes.json()) as Note[];

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export const updateNote = (userId: string | undefined, note: Note): Promise<unknown> => {
	try {
		return fetch(`${String(import.meta.env.VITE_API_UPDATE)}${userId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ note }),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Error");
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};

export const deleteNote = (userId: string | undefined, noteId: string): Promise<unknown> => {
	try {
		return fetch(`${String(import.meta.env.VITE_API_DELETE)}userId=${userId}&noteId=${noteId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("Error");
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		throw error;
	}
};
