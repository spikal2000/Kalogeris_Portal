import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  login(){
    // Implement login functionality here
    if (this.username === 'admin' && this.password === 'admin123') {
      alert('Login successful');
      // Navigate to dashboard or admin page
    } else {
      alert('Invalid credentials');
    }
  }

}
