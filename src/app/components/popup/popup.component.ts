import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [PaymentComponent, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  isDelete: boolean = false;

  constructor(private dialogRef: MatDialog, private ticketService: TicketService) {}

  id: string = '';
  title: string = '';
  description: string = '';
  price: number = 0;
  date: string = '';

  ngOnInit() {
    console.log('popup component')
    // console.log(this.ticketService.getThisTicketId());
    // console.log(this.ticketService.getTickets());

    this.id = this.ticketService.getThisTicketId();
    const ticket = this.ticketService.getTicketById(this.id);
    
    this.title = ticket.title;
    this.description = ticket.description;
    this.price = ticket.price;
    this.date = this.ticketService.convertDate(ticket.expiry);
  }


  enableDelete() {
    this.isDelete = true;
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  deleteTicket() {
    // hit delete endpoint
  }
}
