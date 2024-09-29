import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";

export default function ChatPage() {
  const userCookie = cookies().get("_SS");
  if (!userCookie?.value) {
    redirect("/login");
    return null;
  }

  const roomId = "11233";

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <ChatHeader currentUser={userCookie?.value} />
      <MessageList currentUser={userCookie?.value} roomId={roomId} />
      <MessageInput currentUser={userCookie?.value} roomId={roomId} />
    </div>
  );
}
