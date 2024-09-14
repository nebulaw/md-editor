import { Effect } from "./toolbar";

export type ThemeType = "Noctis Lilac" | "Dracula" | "Default" | "Ayu Light";

export type EditorState = {
  theme: ThemeType;
  lineNumbers: boolean;
  lineWrapping: boolean;
  highlightActiveLine: boolean;
  matchBrackets: boolean;
  transparentBackground: boolean;
  effects: Effect[];
}

