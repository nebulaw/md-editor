"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Loading from "./loading";


const EditorContainer = dynamic(() => import('./_components/container'), {
  ssr: false,
  loading: () => <Loading />
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate some delay for loading the editor
    setTimeout(() => setIsLoading(false), 340);
  }, []);

  return (
    <div className="app">
      {isLoading ? <Loading /> : <EditorContainer />}
    </div>
  );
};

export default Page;

// export function OldHome() {
//   const [markdown, setMarkdown] = useState<string>("");
//
//   const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMarkdown(event.target.value);
//   };
//
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       const textarea = event.target as HTMLTextAreaElement;
//       const start = textarea.selectionStart;
//       const end = textarea.selectionEnd;
//       const value = textarea.value;
//
//       // Insert 2 spaces for tab
//       const newValue = value.substring(0, start) + "  " + value.substring(end);
//
//       setMarkdown(newValue);
//
//       // Move the cursor to the end of the inserted tab spaces
//       setTimeout(() => {
//         textarea.selectionStart = textarea.selectionEnd = start + 2;
//         textarea.focus();
//       }, 0);
//     }
//   };
//
//   const addMarkdownSyntax = (syntax: string, surround: boolean = true) => {
//     const textarea = document.getElementById(
//       "markdown-input"
//     ) as HTMLTextAreaElement;
//     const selectionStart = textarea?.selectionStart;
//     const selectionEnd = textarea?.selectionEnd;
//     let newMarkdown: string;
//     if (surround && selectionStart !== selectionEnd) {
//       newMarkdown =
//         markdown.slice(0, selectionStart) +
//         syntax +
//         markdown.slice(selectionStart, selectionEnd) +
//         syntax +
//         markdown.slice(selectionEnd);
//     } else {
//       newMarkdown =
//         markdown.slice(0, selectionStart) +
//         syntax +
//         markdown.slice(selectionStart);
//     }
//     setMarkdown(newMarkdown);
//   };
//
//   const getMarkdownText = () => {
//     const rawMarkup = marked(markdown);
//     return { __html: rawMarkup };
//   };
//
//   const saveFile = () => {
//     const blob = new Blob([markdown], { type: "text/markdown" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "document.md";
//     link.click();
//     URL.revokeObjectURL(url);
//   };
//
//   const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target?.result as string;
//         setMarkdown(content);
//       };
//       reader.readAsText(file);
//     }
//   };
//
//   return (
//     <div className="h-full">
//       <Head>
//         <title>Markdown Editor</title>
//       </Head>
//       <div className="editor">
//         <div className="toolbar">
//           <button onClick={() => addMarkdownSyntax("**")}>Bold</button>
//           <button onClick={() => addMarkdownSyntax("_")}>Italic</button>
//           <button onClick={() => addMarkdownSyntax("`")}>Code</button>
//           <button onClick={() => addMarkdownSyntax("# ", false)}>
//             Heading
//           </button>
//           <button onClick={() => addMarkdownSyntax("> ", false)}>
//             Blockquote
//           </button>
//           <button onClick={() => addMarkdownSyntax("- ", false)}>List</button>
//           <button onClick={() => addMarkdownSyntax("[text](url)", false)}>
//             Link
//           </button>
//           <button onClick={saveFile}>Save</button>
//           <label htmlFor="file-input" style={{ marginLeft: "10px" }}>
//             Open
//           </label>
//           <input
//             id="file-input"
//             type="file"
//             accept=".md"
//             style={{ display: "none" }}
//             onChange={loadFile}
//           />
//         </div>
//         <div className="main">
//           <div className="textarea-container">
//             <textarea
//               id="markdown-input"
//               value={markdown}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//             />
//           </div>
//           <div
//             className="preview"
//             dangerouslySetInnerHTML={getMarkdownText()}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
