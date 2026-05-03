export default function ContactPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {/* Intro */}
      <p className="text-gray-600 mb-8">
        Have questions, feedback, or suggestions? We'd love to hear from you.
      </p>

      {/* Form */}
      <form className="space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            rows={5}
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Send Message
        </button>

      </form>

    </main>
  )
}