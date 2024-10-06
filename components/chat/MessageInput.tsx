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
}: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const { sendMessage } = useMessages(roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage, currentUser?.displayName! || "Guest", currentUser?.uid! || "Guest");
    setInputMessage("");
  };

  return (
    <div className="p-4 bg-background border-t border-border">
  <form onSubmit={handleSubmit} className="flex space-x-2">
    {!isPublic && (
      <Button onClick={onLeaveChat} variant="ghost" type="button" className="text-muted-foreground hover:text-foreground">
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
    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
      <Send className="h-4 w-4" />
      <span className="sr-only">Send message</span>
    </Button>
  </form>
</div>
  );
}
