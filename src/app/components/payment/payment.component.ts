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
      "key": "rzp_test_QBoToAm2STGvXC",
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
        this.completePayment(response.razorpay_payment_id);
        // alert(response.razorpay_payment_id);
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

  completePayment(paymentId: string) {
    const ticketId = this.ticketService.getThisTicketId();

    this.http.post(`${environment.RESTFUL_URL}/txn`, {
      "ticket_id": ticketId,
      "seller_id": this.cookie.get('userId'),
      "price": this.ticketService.getTicketById(this.ticketService.getThisTicketId()).price,
      "txn_id": paymentId,
      "created_by": this.cookie.get('userEmail'),
      "created_at": new Date(),
      "modified_by": this.cookie.get('userEmail'),
      "modified_at": new Date()
    })
    .subscribe((res) => {
      console.log(res);
    });

  }

  makeEthPayment() {
    const price = this.ticketService.getTicketById(this.ticketService.getThisTicketId()).price * 100

    this.http.post(`${environment.BLOCKCHAIN_SERVER_URL}/contract/balance`, {
      "from_address": "0xaC4a44070487fB311f683a817dceaF3629FAD5C1",
      "to_address": "0xd88515bC08E53a5Df2A274E385E1f03C6612da2b",
      "amount": price
    })
    .subscribe((res) => {
      console.log(res);
    })
  }
}

