import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetStartedComponent } from './get-started.component';



const routes: Routes = [
  { path: '', component: GetStartedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GetStartedRoutingModule {}
