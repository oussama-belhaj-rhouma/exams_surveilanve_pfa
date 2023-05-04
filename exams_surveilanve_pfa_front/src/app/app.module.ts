import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfProfileComponent } from './components/prof-profile/prof-profile.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/adminPage/admin/admin.component';
import { EtudiantComponent } from './components/etudiantPage/etudiant/etudiant.component';
import { ProfComponent } from './components/profPage/prof/prof.component';
import { HistoryCardComponent } from './components/history-card/history-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfProfileComponent,
    RegisterComponent,
    AdminComponent,
    EtudiantComponent,
    ProfComponent,
    HistoryCardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
