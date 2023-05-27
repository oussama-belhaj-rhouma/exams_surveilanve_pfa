import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfProfileComponent } from './components/prof-profile/prof-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfComponent } from './components/profPage/prof/prof.component';
import { EtudiantComponent } from './components/etudiantPage/etudiant/etudiant.component';
import { TestComponent } from './components/test/test.component';
import { RedirectComponent } from './redirect/redirect.component';
import { TablesComponent } from './components/adminPage/tables/tables.component';
import { DashboardComponent } from './components/adminPage/dashboard/dashboard.component';
import { AddprofComponent } from './components/adminPage/addprof/addprof.component';
import { UpdateprofComponent } from './components/adminPage/updateprof/updateprof.component';
import { AddetudiantComponent } from './components/adminPage/addetudiant/addetudiant.component';
import { AddaffecComponent } from './components/adminPage/addaffec/addaffec.component';
import { UpdateetudiantComponent } from './components/adminPage/updateetudiant/updateetudiant.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: RedirectComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'prof', component: ProfComponent },

  { path: 'profile', component: ProfProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendrier', component: TestComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'addprof', component: AddprofComponent },
  { path: 'updateprof/:username', component: UpdateprofComponent },
  { path: 'addetudiant', component: AddetudiantComponent },
  { path: 'addaffec', component: AddaffecComponent },
  { path: 'updateetudiant/:username', component: UpdateetudiantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
