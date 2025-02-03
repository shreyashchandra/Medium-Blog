import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { allBlogsFun } from "../utils/api.utils";
import BlogCard from "../components/BlogCard";
import Skelton from "../components/Skelton";

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
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await allBlogsFun();
    if (res) {
      console.log(res);
      setBlogs(res); // Assuming res is an array of Blog objects
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div>
        <AppBar />

        {loading && <Skelton />}
        {!loading && (
          <div>
            {blogs.map((item: Blog) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    console.log(item.id);
                    window.location.href = `/blog/${item.id}`;
                  }}
                >
                  <BlogCard blog={item} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
