import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsEarnedRoutingModule } from './rewards-earned-routing.module';
import { RewardsEarnedComponent } from './rewards-earned.component';
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
    RewardsEarnedRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule
  ],
  declarations: [RewardsEarnedComponent]
})
export class RewardsEarnedModule { }
