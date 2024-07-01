import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import { AccountService } from './services/account.service';

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
   * @param {AccountService} _accountService used for setting up the local storage
   *                         of the current user.
   */
  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}

  /**
   * ngOnInit derived from OnInit.
   * We are making a request to our API everytime the user refreshes the page.
   */
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  /**
   * Retrieves all the users and contains logic for error handling.
   */
  getUsers(): void {
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

  /**
   * Stores the local user's data for platform usage.
   */
  setCurrentUser(): void {
    const userString = localStorage.getItem('user');

    if (!userString) {
      return;
    }

    const user: User = JSON.parse(userString);
    this._accountService.setCurrenUser(user);
  }
}
