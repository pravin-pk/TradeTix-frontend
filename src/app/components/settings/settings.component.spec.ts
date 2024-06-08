import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsComponent } from './settings.component';
import { AccountComponent } from '../account/account.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { spyOn } from 'jest-mock';
import { Operator, Observable } from 'rxjs';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let cookieService: CookieService;
  let http: HttpClient;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [],
      providers: [CookieService, MatDialog]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and navigate to home', () => {
    spyOn(cookieService, 'get').mockReturnValue('dummyToken');
    spyOn(cookieService, 'deleteAll');
    spyOn(http, 'post').mockReturnValue({
      subscribe: jest.fn(),
      source: undefined,
      operator: undefined,
      lift: function <R>(operator?: Operator<unknown, R> | undefined): Observable<R> {
        throw new Error('Function not implemented.');
      },
      forEach: function (next: (value: unknown) => void): Promise<void> {
        throw new Error('Function not implemented.');
      },
      pipe: function (): Observable<unknown> {
        throw new Error('Function not implemented.');
      },
      toPromise: function (): Promise<unknown | undefined> {
        throw new Error('Function not implemented.');
      }
    });
    spyOn(router, 'navigate');

    component.logout();

    expect(cookieService.deleteAll).toHaveBeenCalled();
    expect(http.post).toHaveBeenCalledWith(
      `${environment.BACKEND_URL}/api/users/logout`,
      {},
      {
        headers: {
          Authorization: 'Bearer dummyToken'
        }
      }
    );
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should open account dialog', () => {
      const dialogOpenSpy: any = jest.spyOn(dialog, 'open');
  
      component.openAccount();
  
      expect(dialogOpenSpy).toHaveBeenCalledWith(AccountComponent);
  });
});