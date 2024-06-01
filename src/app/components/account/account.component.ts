import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  username: string = this.cookie.get('username');

  accNo: string = '';
  ifsc: string = '';

  constructor(private dialogRef: MatDialog, private http: HttpClient, private cookie: CookieService) {}

  ngOnInit() {
    this.http.get(`${environment.BACKEND_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${this.cookie.get('token')}`
      }
    }).subscribe((response: any) => {
      this.accNo = response.data.accountNumber;
      this.ifsc = response.data.IFSCCode;
    });
  }

  bankForm = new FormGroup({
    accountNumber: new FormControl(''),
    IFSCCode: new FormControl(''),
  })

  closeDialog() {
    this.dialogRef.closeAll();
  }

  updateBankDetails(event: Event) {
    event.preventDefault();
    console.log('updating bank details');

    const token = this.cookie.get('token');
    const userId = this.cookie.get('userId');

    this.http.post(`${environment.BACKEND_URL}/api/users/${userId}/bank-details`, this.bankForm.value, {
      headers: {
      Authorization: `Bearer ${token}`
      },
    }).subscribe((response: any) => {
      console.log(response);
    });
  }

}
