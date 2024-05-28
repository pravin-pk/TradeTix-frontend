import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-ticket.component.html',
  styleUrl: './upload-ticket.component.css'
})
export class UploadTicketComponent {

  title!: string;
  description!: string;
  category!: string;
  price!: number;
  expiryDate!: Date;
  image!: string;

  uploadTicket() {
    console.log('uploading ticket');
    this.title = '';
  }

}
