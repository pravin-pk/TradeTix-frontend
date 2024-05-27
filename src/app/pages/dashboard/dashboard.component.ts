import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuComponent, PopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private dialogRef: MatDialog){}

  openDialog() {
    this.dialogRef.open(PopupComponent);
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

}
