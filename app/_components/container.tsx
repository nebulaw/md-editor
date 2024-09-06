import React, { useState, useCallback } from "react";
import Editor from "./editor";
import Preview from "./preview";

export default function MarkdownContainer() {
  const [value, setValue] = useState<string>("# Hello, World!\n");

  const handleMarkdownChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  
  return (<>
      <Editor initialValue={value} onChange={handleMarkdownChange} />
      <Preview value={value} />
  </>);
}

