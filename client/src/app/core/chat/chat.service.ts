import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateConversationChatRequest,
  CreateConversationChatResponse,
} from '@common/types/chat';
import { environment } from '@environment';

const API_CREATE_NEW_CONVERSATION_CHAT = `${environment.baseUrl}chat/new-consultation`;

@Injectable({ providedIn: 'root' })
export class ChatService {
  http = inject(HttpClient);

  createConversation(data: CreateConversationChatRequest) {
    return this.http.post<CreateConversationChatResponse>(
      API_CREATE_NEW_CONVERSATION_CHAT,
      data,
      { withCredentials: true }
    );
  }
}
