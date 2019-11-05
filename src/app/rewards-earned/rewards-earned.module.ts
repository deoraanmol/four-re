import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsEarnedRoutingModule } from './rewards-earned-routing.module';
import { RewardsEarnedComponent } from './rewards-earned.component';
import {
  MatButtonModule,
  MatCheckboxModule, MatChipsModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GetdepositDialogComponent} from "../getdeposit-dialog/getdeposit-dialog.component";
import {LoginModule} from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RewardsEarnedRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatChipsModule,
    LoginModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [RewardsEarnedComponent]
})
export class RewardsEarnedModule { }
