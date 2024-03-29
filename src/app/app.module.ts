import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// material import
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
// mat import end

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MMainBodyModule } from './m-main-body/m-main-body.module';
import { MNavbarModule } from './m-navbar/m-navbar.module';
import { MLoginModule } from './m-login/m-login.module';
import { MRegisterModule } from './m-register/m-register.module';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.serveice';
import { MCreatePipeModule } from './m-create-pipe/m-create-pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MPipeDetailedModule } from './m-pipe-detailed/m-pipe-detailed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MMainBodyModule,
    MNavbarModule,
    BrowserAnimationsModule,
    MLoginModule,
    MRegisterModule,
    MCreatePipeModule,
    MPipeDetailedModule,
    // material modules begin
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatChipsModule,
    // material modules end

    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    // material modules begin
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    // material modules end

    ReactiveFormsModule
  ],
})
export class AppModule { }
