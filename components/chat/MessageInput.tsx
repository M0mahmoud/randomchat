"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/db/useMessages";
import { ChatProps } from "@/lib/types";
import { Send, X } from "lucide-react";
import { SetStateAction, useState } from "react";

export default function MessageInput({
  currentUser,
  roomId,
  onLeaveChat,
  isPublic,
  isPrivateChat,
}: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const { sendMessage } = useMessages(roomId, isPrivateChat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(
      inputMessage,
      currentUser?.displayName || "",
      currentUser?.uid || "",
      isPrivateChat
    );
    setInputMessage("");
  };

  return (
    <div className="px-4 py-1 bg-background border-t border-border">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        {!isPublic && !isPrivateChat && (
          <Button
            onClick={onLeaveChat}
            variant="ghost"
            type="button"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Leave Chat</span>
          </Button>
        )}
        <Input
          type="text"
          placeholder="Type a message..."
          required
          value={inputMessage}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setInputMessage(e.target.value)
          }
          className="flex-grow bg-background text-foreground"
        />
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
