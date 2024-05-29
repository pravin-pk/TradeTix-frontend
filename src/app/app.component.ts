import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare const process: {
  env: {
    BACKEND_URL: string;
  };
};

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
    
    this.http.get(`${process.env.BACKEND_URL}/api/ping`).subscribe((data) => {
      console.log(data);
    });
  }
}

