"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "stranger";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! How are you?", sender: "stranger" },
    {
      id: 2,
      text: "I'm doing well, thanks for asking! How about you?",
      sender: "user",
    },
  ]);

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: text,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
