import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

const HomePage = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { user } = useUser();

	if (!user) {
		return <Navigate to="/" />;
	}

	return <div>HomePage</div>;
};

export default HomePage;
