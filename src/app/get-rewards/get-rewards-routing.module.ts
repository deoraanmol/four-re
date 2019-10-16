import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetRewardsComponent } from './get-rewards.component';

const routes: Routes = [
  { path: '', component: GetRewardsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetRewardsRoutingModule { }
