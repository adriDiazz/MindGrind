import { sendPdf } from "../../services/NotesService";
import Button from "../Ui/Button";
import styles from "./DocModal.module.scss";

export interface DocModalContentProps {
	files: File[];
	imageSrc: string;
	setSelectingDirectory: (c: boolean) => void;
	fileName: string;
	setFilename: (s: string) => void;
}

const DocModalContent: React.FC<DocModalContentProps> = ({
	files,
	imageSrc,
	setSelectingDirectory,
	fileName,
	setFilename,
}) => {
	const handleUpload = async () => {
		const noteResponse = await sendPdf(files[0]); 
        console.log(response);
	};

	return (
		<>
			<h2>Preview Your File</h2>
			{files[0].type.startsWith("application/pdf") && (
				<div className={styles.iframeWrapper}>
					<iframe src={imageSrc} width="90%" height="500px" title="PDF Viewer"></iframe>
				</div>
			)}

			<div className={styles.btnWrapper}>
				<input
					type="text"
					placeholder={files[0].name}
					value={fileName}
					onChange={(e) => {
						setFilename(e.target.value);
					}}
				/>
				<Button
					onClick={() => {
						void handleUpload();
					}}
				>
					Upload
				</Button>
			</div>
		</>
	);
};

export default DocModalContent;
