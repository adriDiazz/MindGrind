import { Route, Routes } from "react-router-dom";

import HomePage from "./sections/HomePage/HomePage";
import Landing from "./sections/Landing/Landing";
import NavBar from "./sections/Ui/NavBar";

export function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</>
	);
}
