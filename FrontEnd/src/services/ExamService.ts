export const getExams = async (userId: string) => {
	try {
		const response = await fetch(`${String(import.meta.env.VITE_API_EXAM)}${userId}`);
		const data = await response.json();

		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};
