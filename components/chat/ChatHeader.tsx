"use client";

import { useOnlinePresence } from "@/db/useOnlinePresence";
import { Link } from "@/i18n/routing";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatHeader({ uid }: { uid: string }) {
  const onlineUsers = useOnlinePresence(uid);

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between">
      <Link href="/">
        <Button role="link" variant="secondary">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Button>
      </Link>
      {/*TODO: For Now */}
      <div className="gap-1 flex items-center">
        <span>{onlineUsers.length}</span>
        <User className="h-6 w-6 text-green-500" />
      </div>
    </header>
  );
}
