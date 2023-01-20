import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './m-navbar/navbar/navbar.component';
import { LoginComponent } from './m-login/login/login.component';
import { RegisterComponent } from './m-register/register/register.component';
import { MainBodyComponent } from './m-main-body/main-body/main-body.component';

const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "**", component: MainBodyComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
