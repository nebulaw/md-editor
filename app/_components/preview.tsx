import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkReact from "remark-react";
import RemarkCode from "./remarkcode";
import { defaultSchema } from "hast-util-sanitize";
import "@/styles/github-markdown.css";
import "@/styles/preview.css";

interface PreivewProps {
  value: string;
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
  },
};

const Preview: React.FC<PreivewProps> = ({ value }) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode,
      },
    })
    .processSync(value).result;
  return (
    <div className="preview markdown-body py-10 px-4">{md}</div>
  );
};

export default Preview;
