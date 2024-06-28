import { Component, OnInit } from '@angular/core';
import { AccountService } from './../services/account.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  /**
   * Constructor.
   *
   * @param {AccountService} _accountServive object to access the login method.
   */
  constructor(private _accountServive: AccountService) {}

  /**
   * ngOnInit method derived from OnInit.
   */

  ngOnInit(): void {}

  /**
   * This function makes a POST request to the login endpoint of the API.
   * It handles sucessful and unsucessful requests. In any case, we call the API
   * to ensure authorization of the user that is trying to login.
   */
  login(): void {
    this._accountServive.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * Loging out of the site. This function sets the loggedIn flag to false.
   */
  logout(): void {
    this.loggedIn = false;
  }
}
