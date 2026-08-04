'use client'
import { useState, useEffect } from 'react';
import { useCreateJobMutation } from '@/redux/api/jobApi';
import { useMeQuery } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createJobSchema, formatJoiErrors } from '@/utils/validators';

export default function createJobPage() {
  const router = useRouter();
  const { data: me } = useMeQuery(undefined)
  useEffect(() => {
    if (!me || me.user.role !== 'admin') {
      router.push('/')
      toast.error("Only admins can perform this action.");
    }
  }, [me, router])

  const [createJob, { isLoading }] = useCreateJobMutation()
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    skills: [] as string[],
    link: '',

  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors({})
    const dataToValidate = {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      salary: jobData.salary,
      description: jobData.description,
      jobType: 'Full-time', // Mock default or state for Joi
      requirements: jobData.skills,
      responsibilities: ''
    }

    const { error: joiError } = createJobSchema.validate(dataToValidate, { abortEarly: false, allowUnknown: true })
    if (joiError) {
      setValidationErrors(formatJoiErrors(joiError))
      return
    }
    try {
      const result = await createJob({
        ...jobData,
        salary: Number(jobData.salary), // Ensure salary is a number    
      }).unwrap()

      setJobData({
        title: '',
        company: '',
        location: '',
        salary: '',
        description: '',
        skills: [],
        link: '',
      })
      //  console.log('Job created successfully:', result);
      toast.success("Job created successfully");

    } catch (err) {
      console.error('Error creating job:', err);
      toast.error("Failed to create job");
    }

  }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Frontend Developer"
              required
              value={jobData.title}
              onChange={(e) =>
                setJobData({ ...jobData, title: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            {validationErrors.title && <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company
            </label>
            <input
              type="text"
              placeholder="Google"
              required
              value={jobData.company}
              onChange={(e) =>
                setJobData({ ...jobData, company: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            {validationErrors.company && <p className="text-red-500 text-sm mt-1">{validationErrors.company}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              placeholder="Remote"
              required
              value={jobData.location}
              onChange={(e) =>
                setJobData({ ...jobData, location: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            {validationErrors.location && <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Salary
            </label>
            <input
              type="number"
              placeholder="50000"
              required
              value={jobData.salary}
              onChange={(e) =>
                setJobData({ ...jobData, salary: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            {validationErrors.salary && <p className="text-red-500 text-sm mt-1">{validationErrors.salary}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>
            <textarea
              rows={6}
              placeholder="Write job description..."
              required
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            {validationErrors.description && <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Skills
            </label>
            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              required
              value={jobData.skills.join(", ")}
              onChange={(e) =>
                setJobData({
                  ...jobData,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate skills with commas.
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Application Link
            </label>
            <input
              type="url"
              placeholder="https://company.com/careers"
              required
              value={jobData.link}
              onChange={(e) =>
                setJobData({ ...jobData, link: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"

            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
}


