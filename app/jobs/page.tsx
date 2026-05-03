

async function getJobs(){
    const res = await fetch('http://localhost:8000/api/jobs')
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
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job: Job) => (
                    <li key={job._id}>{job.title}</li>
                ))}
            </ul>
        </div>
    )
}
