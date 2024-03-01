export interface Note {
	note: string;
	noteId: string;
	isDirectory: boolean;
	title: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface NoteResponse {
	userId: string;
	notes: Note[];
	createdAt: Date;
	updatedAt: Date;
}
