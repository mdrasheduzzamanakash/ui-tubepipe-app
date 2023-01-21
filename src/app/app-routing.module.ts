import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './m-login/login/login.component';
import { RegisterComponent } from './m-register/register/register.component';
import { MainBodyComponent } from './m-main-body/main-body/main-body.component';
import { CreatePipeComponent } from './m-create-pipe/create-pipe/create-pipe.component';

const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'create', component: CreatePipeComponent },
  { path: 'enrol', component: MainBodyComponent },
  { path: "**", component: MainBodyComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
