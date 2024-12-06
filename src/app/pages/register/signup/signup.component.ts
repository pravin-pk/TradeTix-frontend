import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MenuComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) {}

  signupForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });



  signupUser(event: Event) {
    event.preventDefault();
    console.log('form submitted');

    const formValues = {
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value
    };

    this.http.post(`${environment.BACKEND_URL}/api/users/register`, formValues, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .subscribe((response: any) => {

        // const token = response.loggedInUser.token;
        // const username = response.loggedInUser.user.username;

        // this.cookie.set('token', token);
        // this.cookie.set('username', username);

        this.router.navigate(['/sign-in']);
      });
  }
}
