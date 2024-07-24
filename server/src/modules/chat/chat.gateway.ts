import { OnModuleInit, UseFilters } from '@nestjs/common';
import { AllWsExceptionsFilter } from 'src/shared/ws-filters/all-ws-exceptions.filter';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { GatewayGuard } from './gateway.middleware';

import { UserService } from '../user/user.service';
import { UserSocket } from './chat.interface';


@UseFilters(AllWsExceptionsFilter)
@WebSocketGateway({
  cors: { origin: true, credentials: true },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit 
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly gatewayeGuard: GatewayGuard
  ) {}

  onModuleInit() {
    this.gatewayeGuard.add(this.server);
  }

  handleConnection(client: UserSocket, ...args: any[]) {
    console.log(`Connected id:${client.id}`);
  }

  handleDisconnect(client: UserSocket) {
    console.log(`Disconnected id:${client.id}`);
  }

  @SubscribeMessage('randomNumber')
  async getRandomNumber(client: UserSocket, data: any) {
    return Math.random();
  }

  @SubscribeMessage('print_user_info')
  async printUserInfo(client: UserSocket, data: any) {
    console.log('Gateway randomNumber data', data);
    console.log("user: ", client.user);
    console.log("userId: ", client.userId);
    console.log("userSessionToken: ", client.userSessionToken);
  }
}
