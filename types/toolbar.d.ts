import { EditorView } from "@codemirror/view";

export type EffectPlace = "around" | "line" | "none";
export type Effect = {
  name: string;
  active: boolean;
  apply: ApplyEffect;
  keymap: string;
}

export type ApplyEffect = (view?: EditorView) => boolean;
export type ApplyEffectPartial = (place: EffectPlace, startSyntax: string, endSyntax?: string) => ApplyEffect;
export type ApplyEffectAround = (view?: EditorView, startSyntax: string, endSyntax?: string) => boolean;
export type ApplyEffectLine = (view?: EditorView, startSyntax: string) => boolean;

