export default function AboutPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">About Job Finder</h1>

      {/* Intro */}
      <p className="text-gray-600 mb-4">
        Job Finder is a modern platform designed to help job seekers discover
        opportunities quickly and efficiently. Whether you're a developer,
        designer, or analyst, we aim to connect you with the right roles.
      </p>

      {/* Mission */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is to simplify the job search process by providing a clean,
          fast, and user-friendly experience. We focus on delivering relevant
          job listings without unnecessary clutter.
        </p>
      </section>

      {/* Features */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Curated job listings</li>
          <li>Simple and clean interface</li>
          <li>Fast job search experience</li>
          <li>Scalable platform for future features</li>
        </ul>
      </section>

      {/* Tech */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Built With</h2>
        <p className="text-gray-600">
          This project is built using Next.js, Tailwind CSS, and a custom backend
          API for job data.
        </p>
      </section>

    </main>
  )
}