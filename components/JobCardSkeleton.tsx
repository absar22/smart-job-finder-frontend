export default function JobCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>

      <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>

      <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>

      <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
    </div>
  );
}