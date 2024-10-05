import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environments'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  // Servicio genérico para enviar datos
  postData(url: string, data: any): Observable<any> {
    return this.http.post(environment.apiUrl + url, data);
  }

  // Método para iniciar sesión usando el endpoint de token
  login(username: string, password: string): Observable<any> {
    const url = 'api/token/'; 
    return this.postData(url, { username, password });
  }
}
