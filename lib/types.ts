export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: number;
}

export interface ChatProps {
  currentUser: string;
  roomId: string;
}
