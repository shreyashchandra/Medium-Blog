import { useState } from "react";

interface BlogPostProps {
  title: string;
  content: string;
  createdAt: string;
  user: string;
}

export default function BlogPost({
  title,
  content,
  createdAt,
  user,
}: BlogPostProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <article className="max-w-[728px] mx-auto px-6 py-8 font-sans">
      {/* Member badge */}
      {/* <div className="mb-8">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-sm text-yellow-700">
          <span className="text-yellow-500">✦</span> M story
        </span>
      </div> */}

      {/* Title */}
      <h1 className="text-[40px] font-bold leading-tight mb-8 tracking-tight">
        {title}
      </h1>

      {/* Author info */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-black">
          <span>{user?.charAt(0)}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">{user}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>·</span>
            <span> {Math.ceil(content.length / 100)} min read</span>
            <span>·</span>
            <span>
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Engagement bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            className={`p-2 rounded-full hover:bg-gray-100 ${
              isBookmarked ? "text-green-600" : "text-gray-600"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* More options */}
          {/* <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        <p
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-xl mb-8"
        ></p>
      </div>
    </article>
  );
}
