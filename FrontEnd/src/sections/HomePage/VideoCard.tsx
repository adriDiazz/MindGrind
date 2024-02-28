import { FC, useState } from "react";

import { userType } from "../../context/UserContext";
import ModalComponent from "../Ui/ModalComponent";
import { ResponseApi } from "./HomePage";
import styles from "./HomePage.module.scss";
import LastNotesTable from "./LastNotesTable";
import ResumeModal from "./ResumeModal";

interface User {
	user: userType | null;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
	setData: React.Dispatch<React.SetStateAction<ResponseApi | undefined>>;
	opened: boolean;
	data: ResponseApi | undefined;
}

const getYoutubeId = (url: string) => {
	// eslint-disable-next-line no-useless-escape
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : "";
};

const VideoCard: FC<User> = ({ user, setOpened, setData, opened, data }) => {
	const [videoLink, setVideoLink] = useState("");
	const [loading, setLoading] = useState(false);

	const viderId = getYoutubeId(videoLink);

	const handleVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		setVideoLink(e.target.value);
	};

	// eslint-disable-next-line no-console

	const handleCreateButton = () => {
		setOpened(true);
		fetch(`${String(import.meta.env.VITE_API_TRANSCRIPTION)}${viderId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				setData(data as ResponseApi);
				setLoading(false);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
	};

	return (
		<div className={styles.leftWrapper}>
			<div className={styles.videoWrapper}>
				<h2>Youtube Videos To Notes</h2>
				<input
					type="text"
					placeholder="Enter yout video link"
					value={videoLink}
					onChange={handleVideoLink}
				/>
				<button onClick={handleCreateButton}>Create</button>
				<img src="/customUpload.png" alt="" />
			</div>
			<LastNotesTable />
			<ModalComponent opened={opened} setOpened={setOpened}>
				<ResumeModal loading={loading} data={data} videoId={viderId} setLoading={setLoading} />
			</ModalComponent>
		</div>
	);
};

export default VideoCard;
