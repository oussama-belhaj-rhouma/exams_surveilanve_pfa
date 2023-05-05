import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showProfessorBoard = false;
  showEtudiantBoard = false;

  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthorizationService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showProfessorBoard = this.roles.includes('ROLE_PROF');
      this.showEtudiantBoard = this.roles.includes('ROLE_ETUDIANT');


      this.username = user.username;
    }

  }
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.showAdminBoard = false;
    this.showProfessorBoard = false;
    this.showEtudiantBoard = false;
  }

}