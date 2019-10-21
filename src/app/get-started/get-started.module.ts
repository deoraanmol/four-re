import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "../login/login.module";
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GetStartedRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    LoginModule,
    LayoutModule
  ],
  declarations: [GetStartedComponent]
})
export class GetStartedModule { }
