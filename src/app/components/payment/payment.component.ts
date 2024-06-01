import { Component } from '@angular/core';
import { WindowRefService } from '../../window-ref.service';
import { TicketService } from '../../services/ticket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(private winRef: WindowRefService, private ticketService: TicketService, private http: HttpClient, private cookie: CookieService) {}

  amount: number | undefined;

  ngOnInit() {};

  populateRazorpay() {
    let options = {
      "key": "rzp_test_XdAHbKd78KTe3O",
      "amount": this.ticketService.getTicketById(this.ticketService.getThisTicketId()).price * 100,
      "currency": "INR",
      "description": "Trade-Tix",
      "image": "example.com/image/rzp.jpg",
      "prefill":
      {
        "email": "help@tradetix.com",
        "contact": +919900000000,
      },
      "config": {
        display: {
          blocks: {
          preferences: {
            show_default_blocks: true
          }
        }
      }
      },
      "handler":  (response: any) => {
        alert(response.razorpay_payment_id);
        this.completePayment();
      },
      "modal": {
        "ondismiss": function () {
          if (confirm("Are you sure, you want to close the form?")) {
            console.log("Checkout form closed by the user");
          } else {
            console.log("Complete the Payment")
          }
        }
      }
    }
    return options;
  }

  makePayment() {
    const rzp = new this.winRef.nativeWindow.Razorpay(this.populateRazorpay());
    rzp.open();
  }

  completePayment() {
    const ticketId = this.ticketService.getThisTicketId();

    this.http.patch(`${environment.BACKEND_URL}/api/tickets/${ticketId}/buy`, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('token')}`
      },
    })
    .subscribe((res) => {
      console.log(res);
    });

  }
}

