import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center">
      <Link href="/" className="mr-4">
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </Link>
      <h1 className="text-xl font-semibold text-gray-800">Random Chat</h1>
    </header>
  );
}
