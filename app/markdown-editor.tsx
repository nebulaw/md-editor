import { marked } from "marked";
import React from "react";
import {remark} from "remark";
import { useRef } from "react";

interface MarkdownEditor {
  ref: typeof useRef,
  raw: string | undefined | null;
  rendered: string | undefined | null;
}


const addMarkdownSyntax = (textareaElement: HTMLTextAreaElement, syntax: string, surround: boolean = true) => {
  const cursorStart = textareaElement.selectionStart;
  const cursorEnd = textareaElement.selectionEnd;
  let newMarkdown: string;
  if (surround && cursorStart !== cursorEnd) {
    newMarkdown =
      markdown.slice()
  } else {

  }
};

const renderMarkdown = (markdown: string) => {
  const rawMarkup = marked(markdown);
  return { __html: rawMarkup };
}

export default function Editor() {

  return (
    <div className="editor">
      <div className="toolbar">
        <button onClick={() => addMarkdownSyntax('**')}>Bold</button>
        <button onClick={() => addMarkdownSyntax('_')}>Italic</button>
        <button onClick={() => addMarkdownSyntax('`')}>Code</button>
        <button onClick={() => addMarkdownSyntax('# ', false)}>Heading</button>
        <button onClick={() => addMarkdownSyntax('> ', false)}>Blockquote</button>
        <button onClick={() => addMarkdownSyntax('- ', false)}>List</button>
        <button onClick={() => addMarkdownSyntax('[text](url)', false)}>Link</button>
        <button onClick={saveFile}>Save</button>
        <label htmlFor="file-input" style={{ marginLeft: '10px' }}>
          Open
        </label>
        <input
          id="file-input"
          type="file"
          accept=".md"
          style={{ display: 'none' }}
          onChange={loadFile}
        />
      </div>
      <div className="main">
        <div className="textarea-container">
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          className="preview"
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
}

