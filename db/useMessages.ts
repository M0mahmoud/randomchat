"use client";

import { Message } from "@/lib/types";
import { DataSnapshot, onChildAdded, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "./firebase";

export function useMessages(chatId: string, isPrivate: boolean) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const path = isPrivate
      ? `private_chats/${chatId}/messages`
      : `rooms/${chatId}/messages`;
    const messagesRef = ref(rtdb, path);
    const unsubscribe = onChildAdded(messagesRef, (snapshot: DataSnapshot) => {
      const message = snapshot.val();
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, id: snapshot.key as string },
      ]);
    });

    return () => unsubscribe();
  }, [chatId, isPrivate]);

  const sendMessage = (
    text: string,
    sender: string,
    senderUid: string,
    isPrivate: boolean
  ) => {
    const path = isPrivate
      ? `private_chats/${chatId}/messages`
      : `rooms/${chatId}/messages`;
    const messagesRef = ref(rtdb, path);
    push(messagesRef, {
      text,
      sender,
      senderUid,
      timestamp: Date.now(),
    });

    if (isPrivate) {
      const [user1, user2] = chatId.split("_");
      const to = user1 === sender ? user2 : user1;
      const from = user1 !== sender ? user2 : user1;
      const notificationRef = ref(rtdb, `notifications/${to}`);
      push(notificationRef, {
        message: `Private message from ${from}`,
        sender: from,
        timestamp: Date.now(),
        type: "message",
        text,
      });
    }
  };

  return { messages, sendMessage };
}
