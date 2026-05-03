interface Job{
    _id:string
    title:string
    company:string
    location:string
    description:string
}

export default function JobCard({job}: {job: Job}) {
  return (
       <div className="border rounded-lg p-4 hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">
        {job.company} • {job.location}
      </p>
      <p className="text-sm mt-2 text-gray-500 line-clamp-2">
        {job.description}
      </p>
    </div>
  )
}