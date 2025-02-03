import { useState } from "react";
import Editor from "../components/Editor/Editor";
import AppBar from "../components/AppBar";
import { addBlogFun } from "../utils/api.utils";

function AddBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add a blog");
      return;
    }

    try {
      setLoading(true);
      const res = await addBlogFun(token, { title, content });
      console.log("from add blog---", res);

      if (res?.id) {
        alert("Blog added successfully!");
        setContent("");
        setTitle("");
        window.location.href = "/";
      } else {
        alert(res?.message || "Failed to add blog. Please try again.");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white">
      <AppBar />
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <input
          type="text"
          className="w-full  text-5xl text-gray-800 mt-4 border-none outline-none placeholder-gray-300"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="prose prose-lg mt-3">
          <Editor
            handleSubmit={submitHandler}
            setContentFun={setContent}
            content={content}
          />
        </div>
        <button
          className="mt-4 bg-gray-500 text-white px-7 py-2 w-52  rounded-sm cursor-pointer hover:bg-gray-600"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default AddBlog;
