import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsofuseDialogComponent } from './termsofuse-dialog/termsofuse-dialog.component';
import {MatDialogModule, MatFormFieldModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import { GeneralDialogComponent } from './general-dialog/general-dialog.component';
import {TimeSlotServiceService} from "./services/time-slot-service.service";
import {WindowServiceService} from "./services/window-service.service";
import {UserHttpService} from "./services/user-http.service";
import {HttpClientModule} from "@angular/common/http";
import {CurrentUserService} from "./services/current-user.service";

@NgModule({
  declarations: [
    AppComponent,
    TermsofuseDialogComponent,
    GeneralDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [TimeSlotServiceService, UserHttpService, CurrentUserService],
  bootstrap: [AppComponent],
  entryComponents: [TermsofuseDialogComponent, GeneralDialogComponent]
})
export class AppModule { }
