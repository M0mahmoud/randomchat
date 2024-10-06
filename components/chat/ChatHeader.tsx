"use client";

import { useOnlinePresence } from "@/db/useOnlinePresence";
import { Link } from "@/i18n/routing";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "../ui/button";
import { NotificationBell } from "../NotificationBell";

export default function ChatHeader({ uid }: { uid: string }) {
  const onlineUsers = useOnlinePresence(uid);

  return (
    <header className="bg-background border-b border-border p-4 flex items-center justify-between">
      <Link href="../">
        <Button role="link" variant="outline" size="icon">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Button>
      </Link>
      {/*TODO: For Now */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span>{onlineUsers.length}</span>
          <User className="h-6 w-6 text-green-500" />
        </div>
        <NotificationBell />
      </div>
    </header>
  );
}
