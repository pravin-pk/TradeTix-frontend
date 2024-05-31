import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MenuComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signinUser(event: Event) {
    event.preventDefault();
    console.log('form submitted');

    const formValues = {
      email: this.signinForm.controls.email.value,
      password: this.signinForm.controls.password.value
    };

    this.http.post(`${environment.BACKEND_URL}/api/users/login`, formValues)
      .subscribe((response: any) => {
        console.log(response);
        
        const token = response.data.token;
        const username = response.data.user.username;

        this.cookie.set('token', token);
        this.cookie.set('username', username);

        this.router.navigate(['/dashboard']);
      });
  }

}
