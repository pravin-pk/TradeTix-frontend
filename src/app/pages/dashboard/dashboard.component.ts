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
import { TicketService } from '../../services/ticket.service';
import { SettingsComponent } from '../../components/settings/settings.component';
import { AccountComponent } from '../../components/account/account.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, PopupComponent, CommonModule, UploadTicketComponent, PaymentComponent, SettingsComponent, AccountComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  username: string = this.cookie.get('username');
  tickets!: any[];
  ticketsss: any[] = []
  
  isToday: boolean = false;
  isAll : boolean = false;
  isOwned: boolean = false;
  isBought: boolean = false;
  isUpload: boolean = false;


  constructor(private dialogRef: MatDialog, private cookie: CookieService, private router: Router, private http: HttpClient, private ticketService: TicketService){}

  openDialog(id: string) {
    this.ticketService.setThisTicketId(id);
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
    
    this.isUpload = false;

    this.isToday = what === 'today';
    this.isAll = what === 'all';
    this.isOwned = what === 'owned';
    this.isBought = what === 'bought';


    if (this.isOwned || this.isBought) {
      let param: string;
      if (this.isOwned) {
        this.getMyTickets('owner');
      } else {
        this.getMyTickets('buyer');
      }
    }
    else {

    this.http.get(`${environment.BACKEND_URL}/api/tickets/open`, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('token')}`
      }
    
    })
      .subscribe((response: any) => {

        const data = response.data;

        this.tickets = [];
        data.forEach((ticket: any) => {
          console.log(ticket._id);
          this.tickets.push({id: ticket._id, title: ticket.title, img: '../../assets/images/ticket.png', price: ticket.price, date: this.ticketService.convertDate(ticket.expiry)});
          this.ticketService.addTicket(ticket);
        });
      });
    }

  }

  getMyTickets(param: string) {
    console.log('getting my tickets');
    this.http.get(`${environment.BACKEND_URL}/api/tickets/me`, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('token')}`
      }, 
      params: {
        user: param
      }
    })
      .subscribe((response: any) => {
        console.log(response);
        const data = response.data;

        this.tickets = [];
        data.forEach((ticket: any) => {
          console.log(ticket._id);
          this.tickets.push({id: ticket._id, title: ticket.title, img: '../../assets/images/ticket.png', price: ticket.price, date: this.ticketService.convertDate(ticket.expiry)});
          this.ticketService.addTicket(ticket);
        });
      });
  }

  uploadTicket() {
    this.isUpload = true;
    this.isToday = false;
    this.isAll = false;
    this.isOwned = false;
    this.isBought = false;
    
    console.log('uploading ticket component loaded');
  }

  logout() {

    const token = this.cookie.get('token');
    
    this.cookie.deleteAll();
    this.http.post(`${environment.BACKEND_URL}/api/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe((response: any) => {
      console.log(response);
    })
    this.router.navigate(['/home']);
  }

  deleteTicket(id: string) {
    console.log(`deleting ticket ${id}`);

    this.http.delete(`${environment.BACKEND_URL}/api/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('token')}`
      }
    })
      .subscribe((response: any) => {
        console.log(response);
        alert('Ticket deleted successfully');
        this.isOwned = false;
        this.ngOnInit();
      });
  }

}
