/* eslint-disable prettier/prettier */
import "./styles.css";

import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	ChangeCodeMirrorLanguage,
	codeBlockPlugin,
	codeMirrorPlugin,
	CodeToggle,
	ConditionalContents,
	CreateLink,
	diffSourcePlugin,
	headingsPlugin,
	InsertAdmonition,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	InsertSandpack,
	InsertTable,
	InsertThematicBreak,
	linkDialogPlugin,
	listsPlugin,
	ListsToggle,
	markdownShortcutPlugin,
	MDXEditor,
	quotePlugin,
	sandpackPlugin,
	ShowSandpackInfo,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { userType } from "../../context/UserContext";
import Chat from "./Chat";




const simpleSandpackConfig: import("@mdxeditor/editor").SandpackConfig = {
	defaultPreset: "react",
	presets: [
		{
			label: "React",
			name: "react",
			meta: "live react",
			sandpackTemplate: "react",
			sandpackTheme: "light",
			snippetFileName: "/App.js",
			snippetLanguage: "jsx",
		},
	],
};

export default function EditorPage() {
	const [activeChat, setActiveChat] = useState(false);
  const [notes, setNotes] = useState("");
  const { state } = useLocation() as { state: { data: {
    chatGptNotes: string;
  }, user: userType } };
  const { data, user } = state; 
   
	useEffect(() => {
		const editorDiv = document.querySelector<HTMLDivElement>("._contentEditable_11eqz_352");
		if (editorDiv && activeChat) {
			editorDiv.style.width = "60%";
      editorDiv.style.backgroundColor = "white";
       const div = document.querySelector<HTMLDivElement>(
         "._rootContentEditableWrapper_11eqz_1047"
       );
       if (div) {
         div.style.display = "block";
         div.style.marginLeft = "3rem";
       }
		}
		if (editorDiv && !activeChat) {
			editorDiv.style.width = "80%";
      editorDiv.style.padding = "2rem";
      editorDiv.style.backgroundColor = "white";
       const div = document.querySelector<HTMLDivElement>(
         "._rootContentEditableWrapper_11eqz_1047"
       );
       if (div) {
         div.style.display = "flex";
         div.style.flexDirection = "row";
         div.style.alignItems = "center";
         div.style.justifyContent = "center";
       }
		}
	}, [activeChat]);

	return (
    <div className="editor-container">
      <MDXEditor
        markdown={data.chatGptNotes}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertAdmonition />
                <InsertCodeBlock />
                <InsertFrontmatter />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      when: (editor) => editor?.editorType === "sandpack",
                      contents: () => <ShowSandpackInfo />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          }),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkDialogPlugin(),
          diffSourcePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: { js: "JavaScript", css: "CSS" },
          }),
        ]}
      />
        <Chat activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
}
