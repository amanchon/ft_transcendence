import { OnModuleInit } from '@nestjs/common';
import { WebSocketServer, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Joueur, Message, Partie } from './app.entity';
import { MessageService, PartieService } from './app.service';

@WebSocketGateway()
export class MessagesGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;

  constructor(private readonly msgService: MessageService) {};

  onModuleInit() {
    //this.server.listen(3001); // -- utile ? listen deja dans le main
    this.server.on('connection', function(socket: Socket)  {
        socket.join("room1"); // join sur tous les canaux du joueur (joueur.canal[].id)
        socket.on('message', function(message: Message) {
        // Verif origines msg, permissions etc
        this.msgService.create(message); // Verif Erreurs
        this.socket.to(message.salon.id.toString()).emit('message', message);
        }.bind(this));
    }.bind(this)); // pour lier le contexte de this à l'objet courant, équivalent à déclarer la fonction en utilisant "=>"
  }
}