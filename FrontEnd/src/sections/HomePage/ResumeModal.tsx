import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../Ui/Loader";
import { ResponseApi } from "./HomePage";
import style from "./ResumeModal.module.scss";

interface ResumeModalProps {
	loading: boolean;
	data: ResponseApi | undefined;
	videoId: string;
}

const ResumeModal: FC<ResumeModalProps> = ({ loading, videoId, data }) => {
	const notesShort = data?.chatGptNotes.slice(0, 2000);
	const navigate = useNavigate();

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
									navigate("/editor");
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
