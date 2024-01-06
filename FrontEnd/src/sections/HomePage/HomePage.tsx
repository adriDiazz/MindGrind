import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

const HomePage = () => {
	const { user, signOut } = useUser();

	if (!user) {
		return <Navigate to="/" />;
	}

	return <div>HomePage</div>;
};

export default HomePage;
