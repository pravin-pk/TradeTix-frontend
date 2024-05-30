import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.BACKEND_URL}/api/ping`).subscribe((data) => {
      console.log(data);
    });
  }
}

