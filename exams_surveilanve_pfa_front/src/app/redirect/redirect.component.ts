import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  admin = false;
  prof = false;
  etudiant = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.prof = this.roles.includes('ROLE_PROF');
      this.etudiant = this.roles.includes('ROLE_ETUDIANT');

      if (!this.isLoggedIn) {
        this.router.navigate(['/login']);
      } else {
        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['calendrier']);
        }
      }
    }
  }
}
