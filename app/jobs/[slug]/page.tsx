import JobDetailClient from "../../../components/JobDetailClient";

export default async function JobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <JobDetailClient slug={slug} />;
}

