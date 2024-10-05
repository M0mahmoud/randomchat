"use client";

import { Message } from "@/lib/types";
import { DataSnapshot, onChildAdded, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "./firebase";

export function useMessages(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(rtdb, `rooms/${roomId}/messages`);
    const unsubscribe = onChildAdded(messagesRef, (snapshot: DataSnapshot) => {
      const message = snapshot.val();
      console.log("message", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, id: snapshot.key as string },
      ]);
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = (text: string, sender: string, senderUid: string) => {
    const messagesRef = ref(rtdb, `rooms/${roomId}/messages`);
    push(messagesRef, {
      text,
      sender,
      senderUid,
      timestamp: Date.now(),
    });
  };

  return { messages, sendMessage };
}
