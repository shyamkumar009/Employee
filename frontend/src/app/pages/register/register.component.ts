import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    userType: 'user' // default role
  };

  validationMessages = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    this.clearValidationMessages();

    if (!form.valid) {
      this.setValidationMessages(form);
      return;
    }

    this.authService.register(this.user).subscribe(
      res => {
        alert('User registered successfully');
        this.router.navigate(['/login']);
      },
      err => {
        console.error(err);
        alert(err.error?.msg || 'Registration failed');
      }
    );
  }

  private clearValidationMessages() {
    this.validationMessages = { name: '', email: '', password: '' };
  }

  private setValidationMessages(form: NgForm) {
    const controls = form.controls;

    if (controls['name']?.errors) {
      this.validationMessages.name = this.getErrorMessage(controls['name'].errors);
    }
    if (controls['email']?.errors) {
      this.validationMessages.email = this.getErrorMessage(controls['email'].errors);
    }
    if (controls['password']?.errors) {
      this.validationMessages.password = this.getErrorMessage(controls['password'].errors);
    }
  }

  private getErrorMessage(errors: any): string {
    if (errors.required) return 'This field is required.';
    if (errors.minlength) return `This field must be at least ${errors.minlength.requiredLength} characters long.`;
    if (errors.email) return 'Please enter a valid email address.';
    return '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
