import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: any;

  /**
   * Constructor.
   *
   * @param {HttpClient} _http used for making HTTP requests.
   */

  constructor(private _http: HttpClient) {}

  /**
   * ngOnInit derived from OnInit.
   * We are making a request to our API everytime the user refreshes the page.
   */
  ngOnInit(): void {
    this._http.get('http://localhost:5000/api/user').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.log('Error:\n' + JSON.stringify(error));
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
