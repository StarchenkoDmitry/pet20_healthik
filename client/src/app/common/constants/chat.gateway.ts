export const ServerEvents = {
  subscribeOnChat: 'ServerEvents.subscribeOnChat',
  getAllMessages: 'ServerEvents.getAllMessages',
  createMessage: 'ServerEvents.createMessage',
  deleteMessage: 'ServerEvents.deleteMessage',
} as const;

export const ClientEvents = {
  subscribeOnChatResponse: 'ClientEvents.subscribeOnChatResponse',
  getAllMessagesResponse: 'ClientEvents.getAllMessagesResponse',
  createMessageResponse: 'ClientEvents.createMessageResponse',
  deleteMessageResponse: 'ClientEvents.deleteMessageResponse',

  onCreatedMessage: 'ClientEvents.onCreatedMessage',
  onDeletedMessage: 'ClientEvents.onDeletedMessage',
} as const;
