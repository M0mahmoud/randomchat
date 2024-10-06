"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import React from "react";

export default function ChatPage() {
  const roomId = "Global";
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <Loading />;
  if (!user) return router.push("/login");

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <ChatHeader uid={user.uid} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <MessageList
            currentUser={user}
            roomId={roomId}
            isPublic={true}
            isPrivateChat={false}
          />
          <MessageInput
            currentUser={user}
            roomId={roomId}
            isPublic={true}
            isPrivateChat={false}
          />
        </>
      )}
    </div>
  );
}
