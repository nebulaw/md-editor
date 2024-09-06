import React, { useState, useCallback } from "react";
import Editor from "./editor";
import Preview from "./preview";
import Toolbar from "./toolbar";
import type { EditorSettings } from "@/types/settings.d";

export default function MarkdownContainer() {
  const [value, setValue] = useState<string>("# Hello, World!\n");
  const [settings, setSettings] = React.useState<EditorSettings>({ theme: "noctisLilac" });

  const onClick = () => {
    setSettings({
      theme: settings.theme === "noctisLilac" ? "dracula" : "noctisLilac"
    });
  }

  const handleMarkdownChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  
  return (<>
    <Editor initialValue={value} onChange={handleMarkdownChange} />
    <Preview value={value} />
  </>);
}

