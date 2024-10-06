"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/db/useMessages";
import { useOnlinePresence } from "@/db/useOnlinePresence";
import { Link } from "@/i18n/routing";
import { ChatProps } from "@/lib/types";
import { cn, timeFormat } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useSound from "use-sound";

export default function MessageList({
  currentUser,
  roomId,
  isPrivateChat,
}: ChatProps) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const onlineUsers = useOnlinePresence(currentUser?.uid || "Guest");
  const { messages } = useMessages(roomId, isPrivateChat);

  const [playMessageSound] = useSound("/msgSound.mp3", {
    volume: 0.5,
  });

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
    // Play sound when a new message is received
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender !== currentUser?.displayName
    ) {
      playMessageSound();
    }
  }, [messages, currentUser?.displayName, playMessageSound]);

  return (
    <ScrollArea className="flex-grow p-4 bg-background">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUser?.displayName;
          const isOnline = onlineUsers.includes(message.senderUid);

          return (
            <div
              key={`${message.timestamp}-${index}`}
              className={cn(
                "flex",
                isCurrentUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex items-end gap-2",
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                )}
              >
                {!isCurrentUser && (
                  <Popover key={`${message.timestamp}-${index}`}>
                    <PopoverTrigger asChild>
                      <Avatar className="w-8 h-8 cursor-pointer relative overflow-visible">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full ml-1 absolute -top-1 -translate-x-1/2 z-10",
                            isOnline ? "bg-green-500" : "bg-destructive"
                          )}
                          aria-label={isOnline ? "Online" : "Offline"}
                        />
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
                        <h3 className="font-semibold text-foreground">
                          {message.sender}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full me-1 inline-block",
                              isOnline ? "bg-green-500" : "bg-destructive"
                            )}
                            aria-label={isOnline ? "Online" : "Offline"}
                          />
                          {isOnline ? "Online" : "Offline"}
                        </p>
                        <div className="flex items-center gap-1">
                          <Link href={`/chat/${message.sender}`} passHref>
                            <Button role="link" className="w-full">
                              Private Message
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full" disabled>
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                <div
                  className={cn(
                    "relative max-w-xs md:max-w-md px-3 py-2 rounded-lg",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p className="text-base">{message.text}</p>
                  <p
                    className={cn(
                      "text-xs mt-0",
                      isCurrentUser
                        ? "text-primary-foreground/75"
                        : "text-secondary-foreground/75"
                    )}
                  >
                    {timeFormat(new Date(message.timestamp))}
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
