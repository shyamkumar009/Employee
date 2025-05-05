import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports:[CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignIn: boolean = true;

  // Sign In form fields
  signinUsername: string = '';
  signinPassword: string = '';
  keepSignedIn: boolean = false;

  // Sign Up form fields
  signupUsername: string = '';
  signupPassword: string = '';
  signupRepeatPassword: string = '';
  signupEmail: string = '';

  onSignIn() {
    console.log('Sign In Form Submitted');
    console.log('Username:', this.signinUsername);
    console.log('Password:', this.signinPassword);
    console.log('Keep Signed In:', this.keepSignedIn);
    // TODO: Call API for login
  }

  onSignUp() {
    console.log('Sign Up Form Submitted');
    console.log('Username:', this.signupUsername);
    console.log('Password:', this.signupPassword);
    console.log('Repeat Password:', this.signupRepeatPassword);
    console.log('Email:', this.signupEmail);
    // TODO: Call API for registration
  }
}
