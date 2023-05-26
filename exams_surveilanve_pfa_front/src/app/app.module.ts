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
import { EtudiantComponent } from './components/etudiantPage/etudiant/etudiant.component';
import { ProfComponent } from './components/profPage/prof/prof.component';
import { HistoryCardComponent } from './components/history-card/history-card.component';
import { SideBarComponent } from './components/adminPage/side-bar/side-bar.component';
import { DashboardComponent } from './components/adminPage/dashboard/dashboard.component';
import { TablesComponent } from './components/adminPage/tables/tables.component';
import { ProfTableComponent } from './components/adminPage/prof-table/prof-table.component';
import { EtudianttableComponent } from './components/adminPage/etudianttable/etudianttable.component';
import { AddprofComponent } from './components/adminPage/addprof/addprof.component';
import { httpInterceptorProviders } from './interceptor/intex';
import { TestComponent } from './components/test/test.component';
import { RedirectComponent } from './redirect/redirect.component';
import { UpdateprofComponent } from './components/adminPage/updateprof/updateprof.component';
import { UpdateetudiantComponent } from './components/adminPage/updateetudiant/updateetudiant.component';
import { AddetudiantComponent } from './components/adminPage/addetudiant/addetudiant.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { HorizontalScrollMenuModule } from 'ngx-horizontal-scroll-menu';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfProfileComponent,
    RegisterComponent,
    EtudiantComponent,
    ProfComponent,
    HistoryCardComponent,
    SideBarComponent,
    DashboardComponent,
    TablesComponent,
    ProfTableComponent,
    EtudianttableComponent,
    AddprofComponent,
    TestComponent,
    RedirectComponent,
    UpdateprofComponent,
    UpdateetudiantComponent,
    AddetudiantComponent,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule,  BrowserAnimationsModule, ToastrModule.forRoot() ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
