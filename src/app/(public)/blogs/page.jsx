import BlogPageCompo from "@/components/public/BlogPageCompo";

export default async function BlogPage() {
  const res = await fetch(`${process.env.BASE_URI}/api/blog`, {
    cache: "no-store",
  });

  const data = await res.json();

  const blogs = data?.data || [];

  // helper to detect video

  function isVideo(url = "") {
    return url.match(/\.(mp4|webm|ogg)$/i);
  }

  return (
    <>
      <BlogPageCompo blogs={blogs}></BlogPageCompo>
    </>
  );
}
