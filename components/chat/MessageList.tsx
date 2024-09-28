import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "stranger";
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-grow p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
