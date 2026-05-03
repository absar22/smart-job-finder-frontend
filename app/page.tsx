import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Welcome to Job Finder</h1>
      <p className="mt-4 text-lg">Find your dream job today!</p>
    </div>
  );
}
