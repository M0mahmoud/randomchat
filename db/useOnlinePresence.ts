"use client";

import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "./firebase";

export function useOnlinePresence(userId: string) {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const userStatusRef = ref(rtdb, `/status/${userId}`);
    const allStatusRef = ref(rtdb, "/status");

    set(userStatusRef, true);
    onDisconnect(userStatusRef).remove();

    const unsubscribe = onValue(allStatusRef, (snapshot) => {
      const statuses = snapshot.val();
      const onlineUserIds = Object.keys(statuses || {}).filter(
        (key) => statuses[key] === true
      );
      setOnlineUsers(onlineUserIds);
    });

    return () => {
      unsubscribe();
      set(userStatusRef, null);
    };
  }, [userId]);

  return onlineUsers;
}
