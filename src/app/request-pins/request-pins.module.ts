import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RequestPinsComponent } from './request-pins.component';
import {RequestPinsRoutingModule} from './request-pins-routing.module';
import {
  MatAutocompleteModule, MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
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
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [DatePipe]
})
export class RequestPinsModule { }
