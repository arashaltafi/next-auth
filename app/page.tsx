import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl">Home Page</h1>

      <Link
        href={'/dashboard'}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-8 py-4"
      >
        See Dashboard
      </Link>
    </main>
  );
}
