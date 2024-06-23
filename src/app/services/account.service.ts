import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'http://localhost:5000/api/';

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
  login(model: any): Observable<Object> {
    return this._http.post(this.baseUrl + 'account/login', model);
  }
}
