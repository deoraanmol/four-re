import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqMobileComponent } from './faq-mobile.component';
import {FaqMobileRoutingModule} from './faq-mobile-routing.module';
import {LayoutModule} from '../layout/layout.module';



@NgModule({
  declarations: [FaqMobileComponent],
  imports: [
    CommonModule,
    FaqMobileRoutingModule,
    LayoutModule
  ]
})
export class FaqMobileModule { }
