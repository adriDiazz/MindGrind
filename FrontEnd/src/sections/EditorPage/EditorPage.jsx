import React, { useCallback, useRef } from "react";
// create editor instance
import { createReactEditorJS } from "react-editor-js";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools";

export default function EditorPage({ data }) {
	const editorCore = useRef(null);
	const ReactEditorJS = createReactEditorJS();

	const handleInitialize = useCallback((instance) => {
		// await instance._editorJS.isReady;
		instance._editorJS.isReady
			.then(() => {
				// set reference to editor
				editorCore.current = instance;
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log("An error occured", err));
	}, []);

	const handleSave = useCallback(async () => {
		// retrieve data inserted
		const savedData = await editorCore.current.save();
		// save data
		//setData(savedData);
	}, []);

	return (
		<div className="editor-container">
			<ReactEditorJS
				onInitialize={handleInitialize}
				tools={EDITOR_JS_TOOLS}
				onChange={handleSave}
				defaultValue={data}
			/>
		</div>
	);
}
