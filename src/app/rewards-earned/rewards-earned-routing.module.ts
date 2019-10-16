import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardsEarnedComponent } from './rewards-earned.component';

const routes: Routes = [
  { path: '', component: RewardsEarnedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsEarnedRoutingModule { }
