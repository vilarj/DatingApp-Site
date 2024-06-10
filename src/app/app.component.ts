import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingApp-Site';
  users: any;


  constructor(private http: HttpClient) {

  }


  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user').subscribe({
      next: response => {this.users = response},
      error: error => {console.log('Error:\n' + JSON.stringify(error))},
      complete: () => {console.log('Request completed')}
    });
  }

}
