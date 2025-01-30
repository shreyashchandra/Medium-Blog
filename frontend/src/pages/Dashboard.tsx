import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { allBlogsFun } from "../utils/api.utils";
import BlogCard from "../components/BlogCard";

const Dashboard = () => {
  interface Blog {
    id: string;
    title: string;
    content: string;
    published: string;
    authorId: string;
    createdAt: string;
    author: {
      name: string;
      bio: string;
    };
  }

  // Correct state typing to hold an array of blogs
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const res = await allBlogsFun();
    if (res) {
      console.log(res);
      setBlogs(res); // Assuming res is an array of Blog objects
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div>
        <AppBar />
        <div>
          {blogs.map((item: Blog) => {
            return (
              <div key={item.id}>
                <BlogCard blog={item} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
