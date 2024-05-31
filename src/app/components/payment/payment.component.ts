import { Component } from '@angular/core';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(private winRef: WindowRefService) {}

  amount: number | undefined;

  ngOnInit() {};

  populateRazorpay() {
    let options = {
      "key": "rzp_test_XdAHbKd78KTe3O",
      "amount": this.amount,
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
}

