import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SignInResponse, SigninSession, UserPermission} from "../types";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_BASE}/auth/login`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  signIn(authKey: string): Observable<SignInResponse> {
    const headers = new HttpHeaders({
      'auth-key': authKey
    });
    return this.http.post<SignInResponse>(this.apiUrl, {}, { headers }).pipe(
        tap((res) => {
          if (res && res.data && res.data.accessToken) {
            this.userSignIn(res);
          } else {
            this.navigateToErrorRoute();
            this.isAuthenticatedSubject.next(false); // Ensure authentication state is set correctly
          }
        }),
        catchError((error) => {
          this.navigateToErrorRoute();
          this.isAuthenticatedSubject.next(false); // Ensure authentication state is set correctly
          return of({} as SignInResponse);
        })
    );
  }

  private navigateToErrorRoute() {
    this.router.navigate(['/error']).then(success => {
      if (!success) {
        console.error('Navigation to /error failed');
      }
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }

  private navigateAfterSignIn(accessToken: string) {
    if (accessToken) {
      this.router.navigate(['/home']).then(success => {
        if (!success) {
          this.navigateToErrorRoute();
        }
      }).catch(err => {
        console.error(err)
        this.navigateToErrorRoute();
      });
    } else {
      this.navigateToErrorRoute();
    }
  }

  isSessionCreated(): boolean {
    const userSessionData = sessionStorage.getItem('user-auth');
    return !!userSessionData;
  }

  userSignIn(userData: { data: { accessToken: string; refreshToken: string; username: string; userPermissions: UserPermission[] } }) {
    const { accessToken, refreshToken, username, userPermissions } = userData.data || {};
    if (!accessToken || !refreshToken) {
      console.error('Invalid sign-in response:', userData);
      this.navigateToErrorRoute();
      return;
    }
    let userAuth: SigninSession = {
      username,
      accessToken,
      refreshToken,
      userPermissions: JSON.stringify(userPermissions),
    };
    sessionStorage.setItem('user-auth', JSON.stringify(userAuth));
    sessionStorage.setItem('access-token', accessToken);
    this.isAuthenticatedSubject.next(true); // Set authenticated state
    this.navigateAfterSignIn(accessToken);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('access-token');
  }

  isUserExist(): boolean {
    const userSessionData = sessionStorage.getItem('user-auth');
    return !!userSessionData;
  }

  getAuthToken(): string {
    const userSessionData = sessionStorage.getItem('user-auth') ?? 'NAU';
    if (userSessionData === 'NAU') {
      return '';
    }
    const userData: { accessToken: string } = JSON.parse(userSessionData);
    return userData.accessToken;
  }

  userSignOut(): void {
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('user-auth');
    sessionStorage.removeItem('user-permissions');
    this.router.navigate(['/login']);
    this.isAuthenticatedSubject.next(false);
  }
}
