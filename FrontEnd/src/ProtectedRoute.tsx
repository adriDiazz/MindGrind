import { Navigate, useLocation } from "react-router-dom";

// Supongamos que tienes un AuthContext que proporciona un valor isAuthenticated
//import { AuthContext } from "./context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const location = useLocation();
	//const { isAuthenticated } = useContext(AuthContext);
	const isAuthenticated = true;

	return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
