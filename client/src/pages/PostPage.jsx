import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostPage() {
  const { postSlug } = useParams();
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/getposts?slug=${postSlug}`);
        const data = await res.json();
        setPageLoading(true);

        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setPageLoading(false);
        } else {
          setError(true);
          setPageLoading(false);
        }
      } catch (error) {
        setError(true);
        setPageLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  if (pageLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl"></Spinner>
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-screen-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg: text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        src={post.image}
        alt={post.title}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full w-max-2xl text-xs">
        <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
}
