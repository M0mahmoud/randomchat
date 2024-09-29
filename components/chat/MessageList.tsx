"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/db/useMessages";
import { useOnlinePresence } from "@/db/useOnlinePresence";
import { ChatProps } from "@/lib/types";
import { format } from "date-fns";
import { useEffect, useRef } from "react";

export default function MessageList({ currentUser, roomId }: ChatProps) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const onlineUsers = useOnlinePresence(currentUser);
  const { messages } = useMessages(roomId);
  console.log(`onlineUsers:`, onlineUsers);

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender === currentUser;
          const isOnline = onlineUsers.includes(message.sender);

          return (
            <div
              key={message.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                } items-end space-x-2`}
              >
                <div
                  className={`relative max-w-xs md:max-w-md p-3 rounded-lg ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2  rounded-full ml-2 absolute -top-1 -translate-x-1/2 animate-ping
                        ${isCurrentUser ? "-right-1" : "-left-1"}
                        ${isOnline ? "bg-green-500" : "bg-red-500"}
                      `}
                    aria-label={isOnline ? "Online" : "Offline"}
                  />
                  <p className="font-semibold text-sm">{message.sender}</p>
                  <p className="text-base">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    {format(new Date(message.timestamp), "hh:mm ")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef}></div>
      </div>
    </ScrollArea>
  );
}
