import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isProf: boolean = false;
  isStudent: boolean = false;
  form: any = {
    username: null,
    email: null,
    password: null,
    role : null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    const role = [];
    if (this.isProf) {
      role.push('prof');
    }
 
    if (this.isStudent) {
      role.push('etudiant');
    }
    if (role.length === 0) {
      this.errorMessage = 'Please select at least one role.';
      this.isSignUpFailed = true;
      return;
    }
    this.authService.register(username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        

        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
      
    });
  }
}