import { User } from './user';

export interface ChatMessage {
  _id: string;
  text: string;
  sender: User;
  receiver?: User | null;
  groupId?: string | null;
  createdAt: string;
}

export interface ChatGroup {
  _id: string;
  name: string;
}

