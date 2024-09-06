import React, { useCallback, useEffect } from "react";
import useCodeMirror from "@/hooks/use-codemirror";

interface EditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
}: EditorProps) => {
  const handleChange = useCallback(
    (state: any) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialValue: initialValue,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    }
  }, [editorView]);

  return <div className="editor-wrapper" ref={refContainer}></div>;
};

export default Editor;
