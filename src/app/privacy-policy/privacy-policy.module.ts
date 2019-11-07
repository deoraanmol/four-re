import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import {PrivacyPolicyRoutingModule} from './privacy-policy-routing.module';
import {LayoutModule} from '../layout/layout.module';



@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    LayoutModule
  ]
})
export class PrivacyPolicyModule { }
