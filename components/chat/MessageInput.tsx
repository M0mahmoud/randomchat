import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { SetStateAction, useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setInputMessage(e.target.value)
          }
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
