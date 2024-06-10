import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// import {provideHttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'DatingApp-Site';
  users: any;
  
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/user').subscribe({
      next: response => {this.users = response; console.log(response)},
      error: error => {console.log('Error:\n ' + JSON.stringify(error))},
      complete: () => {console.log('Request completed')}
    });
  }

}
