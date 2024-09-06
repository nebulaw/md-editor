import { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightActiveLineGutter,
  lineNumbers,
  highlightActiveLine,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  indentOnInput,
  bracketMatching,
  defaultHighlightStyle,
  HighlightStyle,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { noctisLilac, dracula } from 'thememirror';
import type { EditorSettings } from "@/types/settings";

export const transparentTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%",
  },
});

const mapTheme = (theme: string) => {
  switch (theme) {
    case "Noctis Lilac":
      return noctisLilac;
    case "Dracula":
      return dracula;
    default:
      return noctisLilac;
  }
}

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.6em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading2,
    fontSize: "1.4em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading3,
    fontSize: "1.2em",
    fontWeight: "bold",
  },
]);

interface Props {
  initialValue: string;
  onChange?: (state: EditorState) => void;
  settings?: EditorSettings;
}


const useCodeMirror = <T extends Element>({
  initialValue,
  onChange,
  settings,
}: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();

  useEffect(() => {
    if (!refContainer.current) return;
    // this is a workaround to clear the container
    refContainer.current.childNodes.forEach((node) => {
      refContainer.current?.removeChild(node);
    })

    let extensions = [
      keymap.of([...defaultKeymap, ...historyKeymap]),
      history(),
      indentOnInput(),
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
      }),
      EditorView.updateListener.of((update) => {
        if (update.changes) {
          onChange && onChange(update.state);
        }
      }),
    ];
    settings?.lineNumbers && extensions.push(lineNumbers());
    settings?.lineWrapping && extensions.push(EditorView.lineWrapping);
    settings?.highlightActiveLine && extensions.push(highlightActiveLine());
    settings?.highlightActiveLine && extensions.push(highlightActiveLineGutter());
    settings?.matchBrackets && extensions.push(bracketMatching());
    settings?.transparentBackground && extensions.push(transparentTheme);
    settings?.theme && extensions.push(mapTheme(settings.theme));

    const view = new EditorView({
      state: EditorState.create({
        doc: initialValue,
        extensions: extensions,
      }),
      parent: refContainer.current,
    });
    setEditorView(view);
  }, [refContainer, settings]);

  return [refContainer, editorView];
};

export default useCodeMirror;
