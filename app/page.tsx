import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <div className="home-box">
        <h1>Simple Shop</h1>
        <p>A simple place to manage and view your products.</p>
        <Link href="/dashboard" className="home-button">Go to Dashboard</Link>
      </div>
    </main>
  );
}