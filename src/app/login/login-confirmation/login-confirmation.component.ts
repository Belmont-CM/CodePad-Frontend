import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-confirmation-dialog',
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Inicio de sesión</h2>
        <button mat-icon-button (click)="onNoClick()">
        </button>
      </div>
      <mat-dialog-content>
        ¿Desea iniciar sesión ahora?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Cerrar</button>
        <button mat-flat-button color="primary" [mat-dialog-close]="'login'" cdkFocusInitial>Iniciar sesión</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      background-color: #1e2229;
      color: white;
      border-radius: 8px;
      overflow: hidden;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #2a2f38;
    }
    h2 {
      margin: 0;
      font-size: 18px;
    }
    mat-dialog-content {
      padding: 20px;
      font-size: 16px;
    }
    mat-dialog-actions {
      padding: 16px;
      justify-content: flex-end;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class LoginConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LoginConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}