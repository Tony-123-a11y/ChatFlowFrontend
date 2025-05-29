export default function About() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">About Chat Flow</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to <span className="font-semibold">Chat Flow</span> — your modern space for real-time conversations, sharing moments, and staying connected with the people who matter most.
        </p>

        <p className="text-gray-700 mb-6">
          Whether you're chatting with friends, posting updates, or discovering new content, Chat Flow makes it seamless and fun — all in one purple-powered platform.
        </p>

        <div className="grid gap-6">
          <Feature title="💬 Real-Time Chat" description="Stay connected through private or group messaging. Fast, secure, and always in sync." />
          <Feature title="📸 Create Posts" description="Share your moments with the world. Express yourself with text, images, or both." />
          <Feature title="❤️ Like & Comment" description="Engage with posts by liking or dropping a comment to keep the conversation going." />
          <Feature title="📌 Save Posts" description="Bookmark your favorite posts and revisit them whenever you want." />
        </div>

        <p className="text-gray-700 mt-10">
          At Chat Flow, connection goes beyond the chat. We're building a space where community and communication come together — beautifully.
        </p>
      </div>
    </section>
  );
}

function Feature({ title, description }) {
  return (
    <div className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-purple-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
