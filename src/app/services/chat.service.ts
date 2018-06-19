import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { DOCUMENT } from '@angular/platform-browser';
import * as io from 'socket.io-client';


@Injectable()
export class ChatService {

  private socket: any;
  private host: string;
  private port: string
  private protocol: string;
  private url: string = '';
  constructor(@Inject(DOCUMENT) private document: any) {

    this.host = document.location.hostname;
    this.port = document.location.port;
    this.protocol = document.location.protocol;
    
    if (this.protocol != undefined) {
      this.url += this.protocol + '//'
    } else {
      this.url += 'http://'
    }

    if (this.host != undefined) {
      this.url += this.host;
    } else {
      this.url += 'localhost';
    }

    if (this.port != undefined) {
      this.url += ':' + this.port;
    } else {
      this.url += ':8080';
    }

    console.log(this.url);
    this.socket = io.connect(this.url);
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

  typing(sender) {
    this.socket.emit('chattyping', { sender: sender });
  }

  onTyping() {
    return Observable.create(observer => {
      this.socket.on('chattyping', data => {
        observer.next(data);
      });
    });
  }
}
