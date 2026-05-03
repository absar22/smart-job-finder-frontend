
import JobCard from "@/components/JobCard";
async function getJobs(){
    const res = await fetch('http://localhost:8000/api/jobs',{
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
}

export default async function Jobs(){
   
    const data = await getJobs()
    const jobs: Job[] = data.jobs
    console.log(jobs)
    return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </main>
    )
}
