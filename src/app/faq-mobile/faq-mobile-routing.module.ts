import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FaqMobileComponent} from './faq-mobile.component';



const routes: Routes = [
  { path: '', component: FaqMobileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FaqMobileRoutingModule {}
