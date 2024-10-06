import { User } from "firebase/auth";

export interface Message {
  id: number;
  text: string;
  sender: string;
  senderUid: string;
  timestamp: number;
}

export interface ChatProps {
  currentUser: User | null;
  roomId: string;
  onLeaveChat?: () => void;
  isPublic?: boolean;
  isPrivateChat: boolean;
}
