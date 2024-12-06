import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private cookie: CookieService, private http: HttpClient, private router: Router, private dialogRef: MatDialog) { }

  logout() {

    const token = this.cookie.get('token');

    this.cookie.deleteAll();
    this.http.post(`${environment.BACKEND_URL}/api/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    }).subscribe((response: any) => {
      console.log(response);
    })
    this.router.navigate(['/home']);
  }

  openAccount() {
    this.dialogRef.closeAll();
    this.dialogRef.open(AccountComponent);
  }

}
