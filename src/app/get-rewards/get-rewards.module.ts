import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetRewardsRoutingModule } from './get-rewards-routing.module';
import { GetRewardsComponent } from './get-rewards.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TermsofuseDialogComponent} from "../termsofuse-dialog/termsofuse-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GetRewardsRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule
  ],
  declarations: [GetRewardsComponent]
})
export class GetRewardsModule { }
