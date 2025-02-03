import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { useEffect, useState } from "react";
import { getBlogById } from "../utils/api.utils";
import AppBar from "../components/AppBar";
import Skelton from "../components/Skelton";
import { userDetailsFun as fetchUserDetails } from "../utils/api.utils";
const Blog = () => {
  const { id } = useParams(); // Extracts 'id' from the URL
  const [content, setContent] = useState<{
    title: string;
    content: string;
    createdAt: string;
  } | null>(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      if (!id) {
        throw new Error("Blog ID not found");
      }
      const res = await getBlogById(token, id);
      console.log("Fetched Blog Data:", res);
      setContent(res);
      console.log("Content:", content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchUserDetailsLocal = async (token: string) => {
    const res = await fetchUserDetails(token);
    if (res) {
      console.log(res.name);
      setUser(res.name);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetailsLocal(token);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Skelton />
      </div>
    );
  }

  return (
    <>
      <AppBar />
      <div>
        <BlogPost
          title={content?.title || "Default Title"}
          content={content?.content || ""}
          createdAt={content?.createdAt || ""}
          user={user}
        />
      </div>
    </>
  );
};

export default Blog;
