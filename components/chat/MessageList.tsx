"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/db/useMessages";
import { useOnlinePresence } from "@/db/useOnlinePresence";
import { Link } from "@/i18n/routing";
import { ChatProps } from "@/lib/types";
import { format } from "date-fns";
import { UserPlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function MessageList({ currentUser, roomId }: ChatProps) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const onlineUsers = useOnlinePresence(currentUser);
  const { messages } = useMessages(roomId);

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUser;
          const isOnline = onlineUsers.includes(message.sender);

          return (
            <div
              key={`${message.timestamp}-${index}`}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                } items-end gap-2`}
              >
                {!isCurrentUser && (
                  <Popover key={`${message.timestamp}-${index}`}>
                    <PopoverTrigger asChild>
                      <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage
                          src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${message.sender}&radius=50`}
                        />
                        <AvatarFallback>
                          {message.sender[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="ms-4 w-60">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-16 h-16 mb-2">
                          <AvatarImage
                            src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${message.sender}&radius=50`}
                          />
                          <AvatarFallback>
                            {message.sender[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{message.sender}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {isOnline ? "Online" : "Offline"}
                        </p>
                        <div className="flex items-center gap-1">
                          <Link href={`/chat/${message.sender}`} passHref>
                            <Button role="link" className="w-full">
                              Private Message
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                <div
                  className={`relative max-w-xs md:max-w-md px-3 py-2 rounded-lg ${
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
