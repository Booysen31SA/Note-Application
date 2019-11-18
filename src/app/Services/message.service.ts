import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string) {

    if (this.messages.length === 3) {
     this.clear();
    }
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
