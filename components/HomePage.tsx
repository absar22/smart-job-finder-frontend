export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-6 py-24 bg-white">
      
      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
        Find Jobs Faster 🚀
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Get real-time job alerts based on your skills. No more endless scrolling.
        Let the right opportunities come to you.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          View Jobs
        </button>

        <button className="border border-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>

    </main>
  );
}