"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import Loading from "@/components/Loading";
import { useMessages } from "@/db/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import React, { useRef, useEffect } from "react";

const PrivateChat = ({
  params: { chatWith },
}: {
  params: { chatWith: string };
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const chatId =
    user && chatWith ? [user.displayName, chatWith].sort().join("_") : "";
  console.log("chatId", chatId);

  const { messages } = useMessages(chatId, true);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    router.push("/login");
  }

  return (
    <div className="flex flex-col h-dvh bg-background">
      <ChatHeader uid={user?.uid || ""} />

      <MessageList currentUser={user} roomId={chatId} isPrivateChat={true} />

      <MessageInput
        currentUser={user}
        roomId={chatId}
        isPublic={false}
        isPrivateChat={true}
      />
    </div>
  );
};

export default PrivateChat;
