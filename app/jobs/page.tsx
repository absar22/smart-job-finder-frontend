import JobsClient from "../../components/JobsClient";

export default async function Jobs({searchParams,}: { searchParams: Promise<{ page?: string }>;}) {
  const page = Number((await searchParams).page) || 1;
  return <JobsClient page={page} />;
}

