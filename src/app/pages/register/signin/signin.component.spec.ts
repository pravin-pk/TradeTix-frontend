import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { spyOn } from 'jest-mock';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [CookieService],
      declarations: [] // Remove SigninComponent from declarations
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SigninComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signinForm with empty email and password fields', () => {
    expect(component.signinForm.value.email).toBe('');
    expect(component.signinForm.value.password).toBe('');
  });

  it('should call the signinUser method on form submission', () => {
    const signinUserSpy = spyOn(component, 'signinUser');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(signinUserSpy).toHaveBeenCalled();
  });
});