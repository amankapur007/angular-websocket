import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as io from 'socket.io-client';


@Injectable()
export class ChatService {

  private socket: any;
  constructor() {
    this.socket = io.connect('http://localhost:8080');
  }

  sendMessage(data) {
    this.socket.emit('chat', {
      message: data.message,
      sender: data.sender
    });
  }

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('chat', data => {
        observer.next(data);
      });
    });
  }

  typing(sender){
    this.socket.emit('chattyping', {sender:sender});
  }

  onTyping(){
    return Observable.create(observer => {
      this.socket.on('chattyping', data => {
        observer.next(data);
      });
    });
  }
}
