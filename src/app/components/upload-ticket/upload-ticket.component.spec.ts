import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTicketComponent } from './upload-ticket.component';

describe('UploadTicketComponent', () => {
  let component: UploadTicketComponent;
  let fixture: ComponentFixture<UploadTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
