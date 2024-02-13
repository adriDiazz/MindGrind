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

import Chat from "./Chat";


const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

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
			initialSnippetContent: defaultSnippetContent,
		},
	],
};

const data = "## H2 Key Terms and Concepts 📚\n\n- **Prehistoria:** The prehistory is the time period occurring before records of any written history. This era features the earliest human acts of art. \n\n- **Arte Rupestre:** This refers to cave paintings, a form of prehistoric art featuring drawings or paintings made on the wall or ceilings of caves. The most common themes in these images are large wild animals, such as bison, horses, aurochs, and deer, that humans hunted for food. \n\n- **Dólmenes y Cromlech:** Dolmens and cromlechs are types of prehistoric architectural structures built with large stones for different functions. They were often used for burial rites and possibly for astronomical purposes. \n\n- **Venus figurines:** These are a type of small prehistoric sculpture depicting exaggerations of the female form, often with an emphasis on fertility-related characteristics like large breasts and hips.\n\n- **Mesopotamian art:** This refers to the art produced by the civilizations of ancient Mesopotamia, a historic region located in the eastern Mediterranean. Each era had its unique artistic style, which played a significant role in shaping the history of art. \n\n## H2 Questions and Answers ❓💡\n\n- **Q1: When did the earliest human artistic expressions occur?** \n- A1: The first time humans expressed themselves artistically was in prehistory, approximately 25,000 years ago. \n\n- **Q2: What are cave paintings or rock art?**\n- A2: Cave paintings, also known as rock art, were made by prehistoric humans. They're considered to be one of the earliest forms of human expression. Most of the subjects of these paintings were animals hunted for food.\n\n- **Q3: What are Venus figurines?**\n- A3: Venus figurines are prehistoric statuettes depicting women with exaggerated characteristics related to fertility, such as large breasts, hips, and buttocks. It is thought these figurines were used in rituals and symbolized goddesses of fertility.\n\n- **Q4: What roles did Dolmens and Cromlechs play in prehistoric times?**\n- A4: Dolmens and Cromlechs were prehistoric architectural structures made out of large stones. They were often used for burials but were probably also used for astronomical purposes. \n\n## H2 Summary 📝\n\n- **Art is a continuous process**, extending from the prehistoric era to the current day, and has played an essential role throughout the course of human evolution. \n- **The prehistoric era** was marked by the advent of art, with cave paintings being one of the earliest forms of artistic expression. These images, often depicting animals, were found across all continents, illustrating a shared human experience worldwide.\n- **Architectural accomplishments** of the prehistoric era include the construction of Dolmens and Cromlechs. These structures were most likely used for ceremonial practices, such as burials, and possibly astronomical observations. \n- **Figurines, particular Venus figurines,** were crafted with exaggerated feminine features to represent fertility. \n- **Throughout the subsequent centuries,** art evolved alongside civilizations, each establishing its unique style and contribution to the world of art. The art produced by the ancient Mesopotamians is one notable example."

export default function EditorPage() {
	const [activeChat, setActiveChat] = useState(false);

	useEffect(() => {
		const editorDiv = document.querySelector<HTMLDivElement>("._contentEditable_11eqz_352");
		if (editorDiv && activeChat) {
			editorDiv.style.width = "60%";
		}
		if (editorDiv && !activeChat) {
			editorDiv.style.width = "100%";
		}
	}, [activeChat]);

	return (
    <div className="editor-container">
      <MDXEditor
        markdown={data}
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
