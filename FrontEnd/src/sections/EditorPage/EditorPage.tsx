/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
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
	MDXEditorMethods,
	quotePlugin,
	sandpackPlugin,
	ShowSandpackInfo,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNotes } from "../../context/NoteContext";
import { useSelectedNote } from "../../context/SelectedNoteContext";
import { userType } from "../../context/UserContext";
import useDebounce from "../../hooks/useDebounce";
import { updateNote } from "../../services/NotesService";
import { Note, NoteResponse } from "../../types/types";
import NavBar from "../Ui/NavBar";
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

export default function EditorPage({ setIsEditorUrl }) {
  const [activeChat, setActiveChat] = useState(false);
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const { state } = useLocation() as {
    state: { data: NoteResponse | Note; user: userType };
  };
  const { user } = state;
  const [text, setText] = useState("");
  const [note, setNote] = useState(null);
  const { reloadNotes } = useNotes();
  const debouncedText = useDebounce(text, 1000);
  const ref = useRef<MDXEditorMethods>(null);

  let currentNote;
  const data = state.data;

  if ((data as NoteResponse).data?.notes?.length > 0) {
    currentNote = data.data.notes.find(
      (note) => note.noteId === state.data.noteId
    );
  } else if ("data" in state.data) {
    currentNote = state.data;
  }


   useEffect(() => {
     if (!state || !state.data || !state.user) {
       window.location.href = "/";
     }
     
    

     // Lógica para establecer el texto basada en `data`, similar a tu lógica actual
     let currentNote;
     let currentText = "";
    const data = state.data;

     if ((data as NoteResponse).data?.notes?.length > 0) {
       currentNote = data.data.notes.find(
         (note) => note.noteId === state.data.noteId
       );
       currentText = currentNote?.note || "";
       ref.current?.setMarkdown(currentText);
       setNote(currentNote);
     } else if ("data" in state.data) {
       currentNote = state.data;
       currentText = currentNote.data?.note || "";
       ref.current?.setMarkdown(currentText);
       setNote(currentNote);
     }
     // Establece el texto inicial basado en la data disponible
     setText(currentText);
   }, []);

   useEffect(() => {
    const newNote = {...note?.data}
    newNote.note = debouncedText;
    void updateNote(user.userId, newNote).then(() => {
    void reloadNotes();
    });
   }, [debouncedText, note]);

  const sendScreenshotToServer = (imgData) => {
    if(note) {
      const url = note.data
        ? `${String(import.meta.env.VITE_API_S3)}${user.userId}/${
            note.data?.noteId
          }`
        : `${String(import.meta.env.VITE_API_S3)}${user.userId}/${
            note?.noteId
          }`;
      const blob = dataURItoBlob(imgData); // Convierte base64 a Blob

      const formData = new FormData();
      formData.append("image", blob, "screenshot.png");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response)
        .then((data) => void reloadNotes())
        .catch((error) => console.error("Error:", error));
    }
  };

 
  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const captureScreen = () => {
    const input = document.getElementsByClassName("_contentEditable_11eqz_352");
    if (input[0]) {
      const originalStyle = input[0].style.color;
      input[0].style.color = "black"; // O el color que sea seguro para html2canvas

      html2canvas(input[0])
        .then((canvas) => {
          // Restablece el estilo original después de la captura
          input[0].style.color = originalStyle;

          const imgData = canvas.toDataURL("image/png");
          sendScreenshotToServer(imgData);
        })
        .catch((error) => {
          // Asegúrate de restablecer el estilo en caso de error también
          input[0].style.color = originalStyle;
          console.error("Error capturing screen:", error);
        });
    }
    
  };

  useEffect(() => {
    const editorDiv = document.querySelector<HTMLDivElement>(
      "._contentEditable_11eqz_352"
    );
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

  useEffect(() => {
    const isEditorUrl =
      window.location.pathname.includes("/editor") ||
      window.location.pathname.includes("/notes");
    setIsEditorUrl(isEditorUrl);
  }, [state, user]);

   useEffect(() => {
     // Asegura que el DOM haya cargado completamente antes de la captura
     setTimeout(() => captureScreen(), 3000); // Puede ajustar el tiempo según necesidad
   }, [debouncedText, note]);

   const handleChange = (newText: string) => {
      ref.current?.setMarkdown(newText);
      setText(newText);
   }


  return (
    <>
      <NavBar note={currentNote.data} />
      <div className="editor-container" id="capture">
        <MDXEditor
          markdown={text || ""}
          ref={ref}
          onChange={(newText) => handleChange(newText)}
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
    </>
  );
}
