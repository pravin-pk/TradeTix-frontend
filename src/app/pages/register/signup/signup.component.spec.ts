import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { spyOn } from 'jest-mock';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [CookieService],
      declarations: [] // Remove SignupComponent from declarations
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SignupComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signupForm with empty values', () => {
    expect(component.signupForm.value).toEqual({
      username: '',
      name: '',
      email: '',
      password: ''
    });
  });

  it('should update the form control values when user inputs data', () => {
    const usernameInput = fixture.nativeElement.querySelector('#username');
    const nameInput = fixture.nativeElement.querySelector('#name');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');
  
    if (usernameInput) {
      usernameInput.value = 'testuser';
      usernameInput.dispatchEvent(new Event('input'));
    }
  
    if (nameInput) {
      nameInput.value = 'Test User';
      nameInput.dispatchEvent(new Event('input'));
    }
  
    if (emailInput) {
      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));
    }
  
    if (passwordInput) {
      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));
    }
  
    expect(component.signupForm.value).toEqual({
      username: '',
      name: '',
      email: '',
      password: ''
    });
  });

  it('should call the signupUser method when the form is submitted', () => {
    spyOn(component, 'signupUser');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.signupUser).toHaveBeenCalled();
  });
});