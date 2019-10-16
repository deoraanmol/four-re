import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeContentComponent} from './home-content.component';

const routes: Routes = [
  { path: '', component: HomeContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeContentRoutingModule { }
