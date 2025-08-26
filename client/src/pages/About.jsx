export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Raconteur's Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
             Welcome to Raconteur's Blog!
            This blog is the personal project of Rohit Rawat, a developer passionate about technology and problem-solving.
            Here, he writes about software development, coding practices, and the ideas that inspire him along the way.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Rohit is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
