import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import Loader from "../Ui/Loader";
import { ResponseApi } from "./HomePage";
import style from "./ResumeModal.module.scss";

interface ResumeModalProps {
	loading: boolean;
	data: ResponseApi | undefined;
	videoId: string;
	setLoading: (loading: boolean) => void;
}

const ResumeModal: FC<ResumeModalProps> = ({ loading, videoId, data, setLoading }) => {
	const notesShort = data?.chatGptNotes.slice(0, 2000);
	const navigate = useNavigate();
	const { user } = useUser();

	const handleCreateButton = () => {
		fetch(`${String(import.meta.env.VITE_API_SAVE)}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				note: data?.chatGptNotes,
				userId: user?.userId,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				// eslint-disable-next-line no-console
				console.log(data);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className={style.wrapper}>
					<div className={style.videoWrapper}>
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${videoId}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						></iframe>
					</div>
					<div className={style.noteWrapper}>
						<h2>Resume</h2>
						<p>{notesShort}.....</p>
						<div className={style.btnWrapper}>
							<button
								className={style.btnCreate}
								onClick={() => {
									handleCreateButton();
									navigate("/editor", { state: { data, user } });
								}}
							>
								Create Notes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResumeModal;
