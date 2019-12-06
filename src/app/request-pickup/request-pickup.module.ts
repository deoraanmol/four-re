import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RequestPickupRoutingModule } from './request-pickup-routing.module';
import { RequestPickupComponent } from './request-pickup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatSelectModule
} from "@angular/material";
import {UserHttpService} from "../services/user-http.service";
import {CurrentUserService} from "../services/current-user.service";
import {LoginModule} from "../login/login.module";

@NgModule({
  imports: [
    CommonModule,
    RequestPickupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    LoginModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [DatePipe],
  declarations: [RequestPickupComponent]
})
export class RequestPickupModule {}

