import Link from 'next/link';

interface Job {
    title: string;
    company: string;
    location: string;
    description: string;
    salary: number;
    skills: string[];
    createdAt: string;
}

interface JobResponse {
    job: Job;
}

async function getJobBySlug(slug: string) {
    const res = await fetch(`http://localhost:8000/api/jobs/${slug}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        return null
    }
    const data: JobResponse = await res.json();
    return data.job;
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center p-8 bg-red-50 rounded-xl border border-red-100">
                    <h1 className="text-2xl font-semibold text-red-600">Job not found</h1>
                    <p className="text-red-400 mt-2">The position you are looking for might have been closed.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                {/* Header Section */}
                <div className="p-8 border-b border-gray-100 bg-linear-to-r from-blue-50 to-transparent">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                {job.title}
                            </h1>
                            <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                                <span className="flex items-center gap-1">
                                    🏢 {job.company}
                                </span>
                                <span className="flex items-center gap-1">
                                    📍 {job.location}
                                </span>
                                <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                                    💰 ${job.salary.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <button className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl shadow-lg shadow-blue-200 active:scale-95">
                            Apply for this position
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">About the role</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {job.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                                <span 
                                    key={skill} 
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer info */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-400">
                    <span>Posted on {new Date(job.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    <Link href="/jobs" className="hover:text-blue-600 transition-colors">
                        ← Back to all jobs
                    </Link>
                </div>
            </div>
        </div>
    )
}