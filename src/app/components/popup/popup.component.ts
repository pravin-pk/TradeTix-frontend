import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [PaymentComponent, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  isDelete: boolean = false;

  constructor(private dialogRef: MatDialog) {}

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
