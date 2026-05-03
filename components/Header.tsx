import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold"> <Link href="/">Job Finder</Link></h1>

      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link className="hover:text-gray-300 transition-colors" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-gray-300 transition-colors" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* auth buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 transition-colors">
          Login
        </button>
        <button className="bg-red-600 hover:bg-red-700 rounded px-4 py-2 transition-colors">
          Sign Up
        </button>
      </div>
    </header>
  )
}