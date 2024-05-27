import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [PaymentComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(private dialogRef: MatDialog) {}

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
