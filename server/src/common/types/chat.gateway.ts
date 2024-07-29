import { Message } from './message';

export namespace Server {
  export interface SubscribeOnChat {
    chatId: string;
  }
  export interface GetAllMessage {
    subscribed: boolean;
  }
  export interface CreateMessage {
    chatId: string;
    text: string;
  }
  export interface DeleteMessage {
    id: string;
  }
}

export namespace Client {
  export interface SubscribeOnChatResponse {
    subscribed: boolean;
  }
  export interface GetAllMessageResponse {
    messages: Message[];
  }
  export interface CreateMessageResponse {
    message: Message;
  }
  export interface DeleteMessageResponse {
    deleted: boolean;
  }

  export interface OnCreatedMessage {
    message: Message;
  }
  export interface OnDeletedMessage {
    id: string;
  }
}
