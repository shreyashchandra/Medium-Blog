// import { useState } from "react";
// import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css"; // Optional custom styles
import "quill-table-ui/dist/index.css";
import "quill-table-ui";
// import "quill/code";

export default function Editor({
  setContentFun,
  content,
}: {
  handleSubmit: () => void;
  setContentFun: (content: string) => void;
  content: string;
}) {
  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContentFun}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

// Quill Toolbar Configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["code-block"],
    [{ table: "insert-table" }, { table: "delete-table" }],
    // ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "list",
  "bullet",
  "link",
  "image",
  "code-block",
  "table",
];

export {};
