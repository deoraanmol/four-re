import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestPinsComponent } from './request-pins.component';



const routes: Routes = [
  { path: '', component: RequestPinsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RequestPinsRoutingModule {}
