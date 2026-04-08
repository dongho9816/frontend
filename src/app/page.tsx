import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">안녕하세요! 👋</h1>
      <p className="text-gray-500 mb-8">커뮤니티 게시판에 오신 것을 환영합니다.</p>
      <Link href="/community">
        <button className="bg-blue-500 text-white px-6 py-3 rounded text-lg">
          커뮤니티 바로가기 →
        </button>
      </Link>
    </div>
  );
}