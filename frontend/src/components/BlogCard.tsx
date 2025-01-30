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

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="max-w-2xl mx-auto hover:bg-gray-50 transition-all duration-200 p-6 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium shrink-0">
          {blog.author.name[0]}
        </div>

        {/* Author and Date */}
        <div className="flex items-center gap-1 text-sm flex-wrap">
          <span className="font-medium text-gray-800">Shreyash Chandra</span>
          <span className="text-gray-500">·</span>
          <time className="text-gray-500">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-8">
        <div className="flex-1 space-y-2">
          <h2 className="font-bold text-xl text-gray-900 hover:text-gray-700 leading-tight">
            {blog.title}
          </h2>
          <p className="text-gray-600 line-clamp-3 text-base">{blog.content}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Side Hustle
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">3 min read</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="hidden sm:block shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2024-03-01_at_11.29.49_AM-EbmQlHoU8E3sxmFgNQ2hc2QZU5kzCb.webp"
            alt=""
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      </div>
    </article>
  );
}
