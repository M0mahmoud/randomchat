"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import Loading from "@/components/Loading";
import { auth } from "@/db/firebase";
import { useRouter } from "@/i18n/routing";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function ChatPage() {
  const roomId = "Global";
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });
    setIsLoading(false);
    return () => unSub();
  }, [router]);

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <ChatHeader uid={currentUser?.uid!} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MessageList
            currentUser={currentUser}
            roomId={roomId}
          />
          <MessageInput
            currentUser={currentUser}
            roomId={roomId}
            isPublic={true}
          />
        </>
      )}
    </div>
  );
}
