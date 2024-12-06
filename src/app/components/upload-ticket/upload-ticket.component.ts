import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Expansion } from '@angular/compiler';
import { environment } from '../../../environments/environment';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-upload-ticket',
  standalone: true,
  imports: [FormsModule, ButtonComponent, ReactiveFormsModule, DashboardComponent],
  templateUrl: './upload-ticket.component.html',
  styleUrl: './upload-ticket.component.css'
})
export class UploadTicketComponent {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService, private dashboard: DashboardComponent) { }

  ticket = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price:  new FormControl(''),
    expiry: new FormControl(''),
  })

  uploadTicket(event: Event) {
    event.preventDefault();
    console.log('uploading ticket');

    const token = this.cookie.get('token');

    // send ticket to backend
    this.http.post(`${environment.BACKEND_URL}/api/tickets`, this.ticket.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
      .subscribe((response: any) => {
        alert('Ticket uploaded successfully!');
        this.dashboard.getTickets('mine');
      });
  }

}
