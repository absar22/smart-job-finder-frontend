import Link from "next/link";
import JobCard from "@/components/JobCard";
async function getJobs(page:number){
    const LIMIT = 5
    const res = await fetch(`http://localhost:8000/api/jobs?page=${page}&limit=${LIMIT}`,{
        cache: 'no-store'  // store new jobs
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || 'Failed to fetch jobs')
    }
    
    return data
}

interface Job{
    _id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    slug: string;
}

export default async function Jobs({ searchParams,}: {searchParams: Promise<{ page?: string }>}) {
  const page = Number((await searchParams).page) || 1

  const data = await getJobs(page)
  const jobs: Job[] = data.jobs
  const totalPages = data.totalPages

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link key={job._id} href={`/jobs/${job.slug}`} className="block cursor-pointer">
            <JobCard job={job} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">

{/* Pagination */}
  {/* Prev */}
  {page > 1 && (
    <Link
      href={`/jobs?page=${page - 1}`}
      className="px-4 py-2 border rounded hover:bg-gray-100"
    >
      Prev
    </Link>
  )}

  {/* Page Info */}
  <span className="text-gray-600">
    Page {page} of {totalPages}
    {/* {console.log("PAGE:", page)} */}
  </span>

  {/* Next */}
  {page < totalPages && (
    <Link
      href={`/jobs?page=${page + 1}`}
      className="px-4 py-2 border rounded hover:bg-gray-100"
    >
      Next
    </Link>
  )}

</div>
        </main>
  )
}