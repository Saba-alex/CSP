import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MyWebSocketGateway } from './socket/websocket.gateway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: true });
  const config = app.get(ConfigService);
  const port = config.get('port');
  console.log('Starting server on port:', port);
  await app.listen(port);
}
bootstrap();
