import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTicketComponent } from './upload-ticket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadTicketComponent', () => {
  let component: UploadTicketComponent;
  let fixture: ComponentFixture<UploadTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
