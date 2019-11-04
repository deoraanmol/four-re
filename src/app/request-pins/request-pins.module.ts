import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestPinsComponent } from './request-pins.component';
import {RequestPinsRoutingModule} from './request-pins-routing.module';
import {MatAutocompleteModule, MatFormFieldModule, MatSortModule, MatTableModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [RequestPinsComponent],
  imports: [
    CommonModule,
    RequestPinsRoutingModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ]
})
export class RequestPinsModule { }
