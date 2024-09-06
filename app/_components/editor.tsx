import React, { useCallback, useEffect, useState } from "react";
import useCodeMirror from "@/hooks/use-codemirror";
import type { EditorSettings } from "@/types/settings";

import "@/styles/editor.css";

interface EditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
}: EditorProps) => {
  const [settings, setSettings] = useState<EditorSettings>({
    theme: "Noctis Lilac",
    lineNumbers: false,
    lineWrapping: true,
    highlightActiveLine: false,
    matchBrackets: true,
    transparentBackground: true,
  });

  const handleChange = useCallback(
    (state: any) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialValue: initialValue,
    onChange: handleChange,
    settings: settings,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    }
  }, [editorView]);

  return <div className="editor-wrapper sm:p-6 md:p-8 xl:p-16" ref={refContainer}></div>;
};

export default Editor;
