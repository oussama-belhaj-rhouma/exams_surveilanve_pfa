import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfProfileComponent } from './components/prof-profile/prof-profile.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfProfileComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
