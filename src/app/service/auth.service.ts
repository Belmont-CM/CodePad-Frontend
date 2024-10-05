import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  public token: Observable<string | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const token = this.isBrowser() ? localStorage.getItem('token') : null;
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token = this.tokenSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`/api/token/`, { username, password }).pipe(
      map((token) => {
        if (token && token.access && this.isBrowser()) {
          localStorage.setItem('token', token.access);
          this.tokenSubject.next(token.access);
        }
        return token;
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
    this.tokenSubject.next(null);
  }

  get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  // Método para verificar si estamos en el navegador
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
