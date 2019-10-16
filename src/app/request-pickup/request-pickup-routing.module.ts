import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequestPickupComponent} from './request-pickup.component';

const routes: Routes = [
  { path: '', component: RequestPickupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestPickupRoutingModule { }
