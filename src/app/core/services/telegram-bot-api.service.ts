import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN = environment.TELEGRAM_BOT_TOKEN;
const url = `https://api.telegram.org/bot${TOKEN}`;

@Injectable({
  providedIn: 'root'
})
export class TelegramBotApiService {

  constructor(private http: HttpClient) {}

  public sendMessage(chat_id: string, text: string): Observable<any> {
    return this.http.post(`${url}/sendMessage`, {chat_id, text});
  }

  public getUpdates(): Observable<any> {
    return this.http.get(`${url}/getUpdates`);
  }
}
