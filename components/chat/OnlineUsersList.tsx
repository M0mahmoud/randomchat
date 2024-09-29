"use client";

import { useOnlinePresence } from "@/db/useOnlinePresence";
import { User } from "lucide-react";

interface OnlineUsersListProps {
  currentUser: string;
}

export default function OnlineUsersList({ currentUser }: OnlineUsersListProps) {
  const onlineUsers = useOnlinePresence(currentUser);
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Online Users ({onlineUsers.length})
      </h2>
      <ul className="space-y-2">
        {onlineUsers.map((user) => (
          <li key={user} className="flex items-center space-x-2">
            <User className="h-5 w-5 text-green-500" />
            <span className={user === currentUser ? "font-bold" : ""}>
              {user} {user === currentUser && "(You)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
