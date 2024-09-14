import React, { useEffect, useState } from "react";
import Preview from "./preview";
import type { EditorState } from "@/types/editor";
import Toolbar from "./toolbar";
import useCodeMirror from "@/hooks/use-codemirror";

import "@/styles/editor.css";
import { ApplyEffectAround, ApplyEffectLine, ApplyEffectPartial, Effect } from "@/types/toolbar";
import { Transaction } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

// const effectTypeMap = {
//   "around": [
//     { start: "**", end: "**" },
//     { start: "*", end: "*" },
//     { start: "~~", end: "~~" },
//     { start: "[](", end: ")" },
//     { start: "![", end: "]" },
//     { start: "`", end: "`" },
//     { start: "\n```lang", end: "```\n" },
//   ],
//   "line": [
//     { start: ">", end: "" },
//     { start: "# ", end: "" },
//     { start: "## ", end: "" },
//     { start: "### ", end: "" },
//     { start: "#### ", end: "" },
//     { start: "##### ", end: "" },
//     { start: "###### ", end: "" },
//     { start: "- ", end: "" },
//     { start: "- [ ] ", end: "" },
//     { start: "|", end: "" },
//     { start: "---", end: "" },
//     { start: "```", end: "" },
//     { start: "* ", end: "" },
//   ],
//   "none": [],
// }

const partialApply: ApplyEffectPartial = (place, startSyntax, endSyntax?) => {
  return (view?: EditorView) => {
    console.log("Applying effect", startSyntax);
    if (!view) {
      console.error("No view provided");
      return false;
    }
    endSyntax = endSyntax || startSyntax;

    const { from, to } = view.state.selection.main;
    // If the selection is empty, we don't need to wrap anything
    if (from === to) return false;
    // return place === "around" ? applyEffectAround(view, startSyntax, endSyntax) : applyEffectLine(view, startSyntax);

    const selection = view.state.sliceDoc(from, to);
    let transaction: Transaction;

    // remove the syntax if it's already there for around
    if (selection.startsWith(startSyntax) && selection.endsWith(endSyntax)) {
      let newText: string;
      if (place === "around") {
        newText = selection.slice(startSyntax.length, selection.length - endSyntax.length);
      } else {
        newText = selection.slice(startSyntax.length);
      }
      transaction = view.state.update({
        changes: { from, to, insert: newText },
      });
    }
    // else if placing is around, we need to wrap the selection
    else if (place === "around") {
      transaction = view.state.update({
        changes: { from, to, insert: `${startSyntax}${selection}${endSyntax}` },
      })
    }
    else {
      return false;
    }
    // apply the transaction

    view.dispatch(transaction);
    return true
  }
}

const applyEffectAround: ApplyEffectAround = (view, startSyntax, endSyntax?) => {
  return true;
}

const applyEffectLine: ApplyEffectLine = (view, startSyntax) => {
  return true;
}

const extractKeymap = (effectKeymap: string) => {
  return effectKeymap.slice(effectKeymap.lastIndexOf("-") + 1);
}

const effects: Effect[] = [
  {
    name: "bold",
    active: false,
    keymap: "Ctrl-b",
    apply: partialApply("around", "**"),
  },
  {
    name: "italic",
    active: false,
    keymap: "Ctrl-i",
    apply: partialApply("around", "*"),
  },
  {
    name: "strikethrough",
    active: false,
    keymap: "Ctrl-d",
    apply: partialApply("around", "~~"),
  },
  {
    name: "link",
    active: false,
    keymap: "Ctrl-k",
    apply: partialApply("around", "[](", ")"),
  },

];

// "Image",
// "Code",
// "Blockquote",
// "Heading",
// "List",
// "Tasklist",
// "Table",
// "Horizontal Rule",
// "Preview",

export default function MarkdownContainer() {
  const [value, setValue] = useState<string>("");
  const [state, _] = useState<EditorState>({
    theme: "Ayu Light",
    lineNumbers: true,
    lineWrapping: true,
    highlightActiveLine: true,
    matchBrackets: true,
    transparentBackground: true,
    effects: effects,
  });
  const initialValue = "# Hello World";
  const handleChange = (state: any) => setValue(state.doc.toString());
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialValue: initialValue,
    onChange: handleChange,
    state: state,
  });

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey) {
        console.log(event.key);
        if (event.key in effects.map(effect => extractKeymap(effect.keymap))) {
          event.preventDefault();
        }
      }
    });
  }, [editorView])

  return (
    <div className="editor-viewport flex flex-col w-full bg-white">
      <Toolbar effects={effects} view={editorView}/>
      <div className="w-full h-full">
        <div className="editor-container w-full h-full">
          {/* Here's the editor */}
          <div
            className="editor-wrapper py-10 px-2"
            ref={refContainer}
          ></div>
          <Preview value={value} />
        </div>
      </div>

    </div>
  );
}
