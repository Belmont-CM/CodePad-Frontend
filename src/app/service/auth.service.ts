import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.token = this.tokenSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
  return this.http.post<any>(`/api/token/`, { username, password }) 
    .pipe(map(token => {
      if (token && token.access) {
        localStorage.setItem('token', token.access);
        this.tokenSubject.next(token.access);
      }
      return token;
    }));
}


  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  get tokenValue(): string | null {
    return this.tokenSubject.value;
  }
}
