import { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  highlightActiveLineGutter,
  lineNumbers,
  highlightActiveLine,
  KeyBinding,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  indentOnInput,
  bracketMatching,
  syntaxHighlighting,
  HighlightStyle,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { markdown, markdownKeymap, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { noctisLilac, dracula, ayuLight } from 'thememirror';
import type { EditorState as LocalState } from "@/types/editor";

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
    case "Ayu Light":
      return ayuLight;
    default:
      return noctisLilac;
  }
}

const markdownSyntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading,
    fontWeight: "bold",
  },
  {
    tag: tags.link,
    textDecoration: "underline",
  },
  {
    tag: tags.strong,
    fontWeight: "bold",
  },
]);

interface Props {
  initialValue: string;
  onChange?: (state: EditorState) => void;
  state?: LocalState;
}


const useCodeMirror = <T extends Element>({
  initialValue,
  onChange,
  state,
}: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();

  useEffect(() => {
    if (!refContainer.current) return;
    // this is a workaround to clear the container
    refContainer.current.childNodes.forEach((node) => {
      refContainer.current?.removeChild(node);
    })

    let effectKeymap: KeyBinding[] = [];
    state?.effects.map((effect) => {
      effectKeymap.push({
        key: effect.keymap,
        run: (e: EditorView) => effect.apply(e)
      })
    });

    let extensions = [
      keymap.of([...defaultKeymap, ...historyKeymap, ...effectKeymap]),
      history(),
      indentOnInput(),
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
      }),
      syntaxHighlighting(markdownSyntaxHighlighting),
      EditorView.updateListener.of((update) => {
        if (update.changes) {
          onChange && onChange(update.state);
        }
      }),
    ];
    state?.lineNumbers && extensions.push(lineNumbers());
    state?.lineWrapping && extensions.push(EditorView.lineWrapping);
    state?.highlightActiveLine && extensions.push(highlightActiveLine());
    state?.highlightActiveLine && extensions.push(highlightActiveLineGutter());
    state?.matchBrackets && extensions.push(bracketMatching());
    state?.transparentBackground && extensions.push(transparentTheme);
    state?.theme && extensions.push(mapTheme(state.theme));
    // state?.effects.map((effect, index) => {
    //   // here we have to create a command
    //   const key = {
    //     key: effect.keymap,
    //   }
    // })

    const view = new EditorView({
      state: EditorState.create({
        doc: initialValue,
        extensions: extensions,
      }),
      parent: refContainer.current,
    });
    setEditorView(view);
  }, [refContainer, state, initialValue]);

  return [refContainer, editorView];
};

export default useCodeMirror;
