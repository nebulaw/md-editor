import React from "react";

import "@/styles/toolbar.css";
import { EditorView } from "@codemirror/view";
import type { Effect } from "@/types/toolbar";

interface ToolbarProps {
  view?: EditorView;
  effects: Effect[];
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return (
      <div className="mt-4 bg-white flex text-black flex-col">
        <div className="flex gap-3 mx-4 rounded-xl bg-gray-200 px-8 py-4 overflow-x-auto">
        {props.effects.map((effect, index) => (
          <div
            key={index}
            className={"toolbar-button " + (effect.active ? "toolbar-button-selected" : "")}
            onClick={() => effect.apply(props.view)}
          >
            <span className="border-none">{effect.name}</span>
          </div>))}
        </div>
      </div>
  );
}

export default Toolbar;

