import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestPickupRoutingModule } from './request-pickup-routing.module';
import { RequestPickupComponent } from './request-pickup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import {UserHttpService} from "../services/user-http.service";

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
    MatSelectModule
  ],
  declarations: [RequestPickupComponent],
  providers: [UserHttpService]
})
export class RequestPickupModule {}

