"use client";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import Loading from "@/components/Loading";
import { auth, rtdb as database } from "@/db/firebase";
import { useRouter } from "@/i18n/routing";
import { onAuthStateChanged, User } from "firebase/auth";

import { get, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";

export default function RandomChat() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });

    return () => unSub();
  }, [router]);

  useEffect(() => {
    if (currentUser?.displayName) {
      setIsLoading(true);
      const { displayName } = currentUser;
      console.log(`displayName:`, displayName);

      const userRoomRef = ref(database, `users/${displayName}/roomId`);
      // Listen for room ID changes in real-time
      onValue(userRoomRef, (snapshot) => {
        if (snapshot.exists()) {
          // User already has a room, use the existing room ID
          setRoomId(snapshot.val());
        } else {
          const waitingUsersRef = ref(database, "waiting_users");

          // Get the list of waiting users
          get(waitingUsersRef).then((snapshot) => {
            if (snapshot.exists()) {
              const users = snapshot.val();
              const userKeys = Object.keys(users);

              if (userKeys.length >= 1) {
                // Pick a random user from the waiting list
                const randomIndex = Math.floor(Math.random() * userKeys.length);
                const randomUserKey = userKeys[randomIndex];
                const randomUser = users[randomUserKey];

                // Create a new private chat room
                const privateChatRef = push(ref(database, "private_chats"));
                const chatId = privateChatRef.key;

                set(privateChatRef, {
                  users: [randomUser.nickname, displayName],
                });

                // Remove the matched user from the waiting list
                remove(ref(database, `waiting_users/${randomUserKey}`));

                // Update the room ID for both users
                set(ref(database, `users/${displayName}/roomId`), chatId);
                set(
                  ref(database, `users/${randomUser.nickname}/roomId`),
                  chatId
                );

                setRoomId(chatId);
              } else {
                // No users are waiting, add the current user to the waiting list
                set(ref(database, `waiting_users/${displayName}`), {
                  nickname: displayName,
                });
              }
            } else {
              // No users are waiting, add the current user to the waiting list
              set(ref(database, `waiting_users/${displayName}`), {
                nickname: displayName,
              });
            }
          });
        }
      });
    }
    setIsLoading(false);
  }, [currentUser]);

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <ChatHeader uid={currentUser?.uid || "Anonymous"} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {roomId ? (
            <>
              <MessageList
                currentUser={currentUser?.displayName || "Anonymous"}
                roomId={roomId}
              />
              <MessageInput
                currentUser={currentUser?.displayName || "Anonymous"}
                roomId={roomId}
              />
            </>
          ) : (
            <Loading text="Searching for an available chat..." size={8} />
          )}
        </>
      )}
    </div>
  );
}
