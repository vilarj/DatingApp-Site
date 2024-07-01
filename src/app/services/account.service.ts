import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user';

/**
 * Account Service class responsible for handling the following:
 * - Logs users in and out of the platform.
 * - Stores the user data that grant access to the platform until browser is closed.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  baseUrl: string = 'http://localhost:5000/api/';
  currentUser$ = this.currentUserSource.asObservable();

  /**
   * Constructor.
   *
   * @param {HttpClient} _http use to make the HTTP requests.
   */
  constructor(private _http: HttpClient) {}

  /**
   * This function makes a POST request to the login endpoint of the API.
   *
   * @param {any} containing username and password fields from the form.
   * @return  An {Observable<Object>} of the {HttpResponse} for the request, with a response body in the
   * requested type.
   */
  login(model: any): Observable<void> {
    return this._http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrenUser(user);
        }
      })
    );
  }

  /**
   * This function removes the user information stored in the local storage
   * used for data persistency.
   */
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  /**
   * Stores the information of the current user for platform's access.
   * @param user {User} - data pertaining current user accessing platform's services.
   */
  setCurrenUser(user: User): void {
    this.currentUserSource.next(user);
  }
}
