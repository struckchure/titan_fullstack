import { Controller } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { ConfigService } from '@nestjs/config';
import { VALIDATE_REGEX_REQUEST, VALIDATE_REGEX_RESPONSE } from '../constants';
import { ValidateRegexDto } from '../dto/app.dto';
import { AppService } from '../services/app.service';
import { RedisService } from '../services/redis.service';

@Controller()
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    await this.redisService.subscribe(VALIDATE_REGEX_RESPONSE, (message) =>
      client.emit(VALIDATE_REGEX_RESPONSE, JSON.parse(message)),
    );
  }

  @SubscribeMessage(VALIDATE_REGEX_REQUEST)
  async validateRegexRequest(
    @MessageBody() dto: ValidateRegexDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!dto.regex) dto.regex = this.configService.get('DEFAULT_REGEX_PATTERN');

    const job = await this.appService.validateRegex(dto);
    client.emit(VALIDATE_REGEX_REQUEST, job);
  }
}
