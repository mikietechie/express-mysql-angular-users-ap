import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  BASE_URL = "http://localhost:3000/"
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  get(urlExt: string ="") {
    return this.http.get(`${this.BASE_URL}${urlExt}`)
  }

  post(urlExt: string ="", body: any) {
    return this.http.post(`${this.BASE_URL}${urlExt}`, body)
  }

  put(urlExt: string ="", body: any) {
    return this.http.post(`${this.BASE_URL}${urlExt}`, body)
  }

  delete(urlExt: string ="") {
    return this.http.get(`${this.BASE_URL}${urlExt}`)
  }

}
