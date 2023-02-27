import { Module, HttpServer } from '@nestjs/common';
import { MessagesGateway } from './gateway';
import { AppController } from './app.controller';
import { PartieService, JoueurService, MessageService, SalonService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joueur, Partie, Message, Salon } from './app.entity'
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { PassportModule } from '@nestjs/passport';
import { MyOAuth2Strategy } from './auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'oauth2', session: true }), // uniquement pour utiliser AuthGuard ?
    TypeOrmModule.forFeature([Partie, Message, Joueur, Salon]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: 'pong',
        password: 'pong',
        database: 'DB_PONG', // configService.get('DB_NAME'),
        entities: [Joueur, Partie, Message, Salon],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
   ],
  controllers: [AppController],
  providers: [MessagesGateway, PartieService, JoueurService, MessageService, SalonService, Repository], 
})
export class AppModule {}