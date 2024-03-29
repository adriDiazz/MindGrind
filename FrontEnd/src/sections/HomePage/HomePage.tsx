import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import styles from "./HomePage.module.scss";
import LeftMenu from "./RightMenu";
import VideoCard from "./VideoCard";

export interface ResponseApi {
	chatGptNotes: string;
}

const HomePage = ({ setIsEditorUrl }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { user } = useUser();
	const [opened, setOpened] = useState(false);
	const [data, setData] = useState<ResponseApi>();

	useEffect(() => {
		const isEditorUrl =
			window.location.pathname.includes("/editor") || window.location.pathname.includes("/notes");
		setIsEditorUrl(isEditorUrl);
	}, [setIsEditorUrl]);

	if (!user) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.wrapper}>
			<LeftMenu user={user} />
			<VideoCard user={user} setOpened={setOpened} setData={setData} opened={opened} data={data} />
		</div>
	);
};

export default HomePage;
