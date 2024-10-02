"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/db/useMessages";
import { ChatProps } from "@/lib/types";
import { Send } from "lucide-react";
import { SetStateAction, useState } from "react";

export default function MessageInput({ currentUser, roomId }: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const { sendMessage } = useMessages(roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage, currentUser);
    setInputMessage("");
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          required
          value={inputMessage}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setInputMessage(e.target.value)
          }
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
