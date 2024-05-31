import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { UploadTicketComponent } from '../../components/upload-ticket/upload-ticket.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PaymentComponent } from '../../components/payment/payment.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, PopupComponent, CommonModule, UploadTicketComponent, PaymentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  username: string = this.cookie.get('username');
  isUpload: boolean = false;
  tickets!: any[];

  ticketsss: any[] = []

  constructor(private dialogRef: MatDialog, private cookie: CookieService, private router: Router, private http: HttpClient){}

  openDialog() {
    this.dialogRef.open(PopupComponent);
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  ngOnInit() {
    if (!this.cookie.check('token')) {
      this.router.navigate(['/sign-in']);
    }
    this.getTickets('trending');
  }

  getTickets(what: string) {
    console.log(`getting tickets for ${what}`);
    if (what === 'mine') {
      // PopupComponent.prototype.enableDelete();
      console.log(PopupComponent.prototype.isDelete);
    }
    PaymentComponent.prototype.amount = 5238*100;

    this.http.get(`${environment.BACKEND_URL}/api/tickets/open`)
      .subscribe((response: any) => {

        const data = response.data;

        this.tickets = [];
        data.forEach((ticket: any) => {
          console.log(typeof ticket.expiry);
          this.tickets.push({title: ticket.title, img: '../../assets/images/ticket.png', price: 'lajdflas', date: this.convertDate(ticket.expiry)});
        });
        

      });

  }

  convertDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  uploadTicket() {
    this.isUpload = true;
    console.log('uploading ticket component loaded');
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/home']);
  }

}
