import { Component, OnInit, ViewChild, ElementRef, DoCheck, AfterContentChecked } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  
  message:string
  sender:string
  @ViewChild('output') output: ElementRef;
  @ViewChild('feed') feed: ElementRef;
  
  constructor(private _chatService: ChatService) { }
  
  ngOnInit() {
    this._chatService.onNewMessage().subscribe(data => {
      this.feed.nativeElement.innerHTML="";
      this.output.nativeElement.innerHTML+='<p><strong>' + data.sender + ': </strong>' + data.message + '</p>'
    });

    this._chatService.onTyping().subscribe(data => {
      this.feed.nativeElement.innerHTML=`<p><em> ${data.sender} is typing ... </em></p>`;
    });
  }

  send(){
    this._chatService.sendMessage({
      message:this.message,
      sender:this.sender
    });
  }

  typing(){
    this._chatService.typing(this.sender);
  }
}
