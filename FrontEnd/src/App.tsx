import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./sections/HomePage/HomePage";
import Landing from "./sections/Landing/Landing";
import NavBar from "./sections/Ui/NavBar";
import { UserProvider } from "./context/UserContext";

export function App() {
	return (
		<>
			<UserProvider>
				<NavBar />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/home" element={<HomePage />} />
					<Route
						path="/jopa"
						element={
							<ProtectedRoute>
								<h1>Jopa es de ley</h1>
							</ProtectedRoute>
						}
					/>{" "}
					<Route path="*" element={<h2>404</h2>} />
				</Routes>
			</UserProvider>
		</>
	);
}
