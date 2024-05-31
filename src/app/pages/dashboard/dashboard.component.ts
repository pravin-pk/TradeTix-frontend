import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { UploadTicketComponent } from '../../components/upload-ticket/upload-ticket.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, PopupComponent, CommonModule, UploadTicketComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  username: string = this.cookie.get('username');
  isUpload: boolean = false;
  tickets!: any[];

  ticketsss: any[] = [
    {name: 'x', img: 'https://assets.codepen.io/285131/github.svg', desc: 'lajdflas'},
    {name: 'y', img: 'https://xyz.com/img1.png', desc: 'lajdflas'},
    {name: 'z', img: 'https://xyz.com/img1.png', desc: 'lajdflas'},
  ];

  constructor(private dialogRef: MatDialog, private cookie: CookieService, private router: Router){}

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

  getTickets(category: string) {
    console.log(`getting tickets for ${category}`);
    this.tickets = [];
    this.tickets.push({name: `${category}`, img: 'https://assets.codepen.io/285131/github.svg', desc: 'lajdflas'});
  }

  uploadTicket() {
    this.isUpload = true;
    console.log('uploading ticket component loaded');
  }

}
