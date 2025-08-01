import { Component } from '@angular/core';
import { UserLoginData } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, NgIf, AlertComponent, MatButtonModule, MatIconModule, RouterLink]
})
export class LoginComponent {
  hide = true;
  userData: UserLoginData = {
    username: '',
    password: '',
  };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        if (value.length === 0) {
          this.errorMessage = 'Podano nieprawidlowe dane do logowania.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
