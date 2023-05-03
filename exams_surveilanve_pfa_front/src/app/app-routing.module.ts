import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfProfileComponent } from './components/prof-profile/prof-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfComponent } from './components/profPage/prof/prof.component';
import { EtudiantComponent } from './components/etudiantPage/etudiant/etudiant.component';
import { AdminComponent } from './components/adminPage/admin/admin.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'prof', component: ProfComponent },

  { path: 'profile', component: ProfProfileComponent },
  { path: 'register', component: RegisterComponent }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
