import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-content',
    pathMatch: 'full'
  },
  { path: 'get-started', loadChildren: './get-started/get-started.module#GetStartedModule' },
  { path: 'request-pins', loadChildren: './request-pins/request-pins.module#RequestPinsModule' },
  { path: 'home-content', loadChildren: './home-content/home-content.module#HomeContentModule' },
  {
    path: 'request-pickup',
    loadChildren: './request-pickup/request-pickup.module#RequestPickupModule'
  },
  { path: 'rewards-earned', loadChildren: './rewards-earned/rewards-earned.module#RewardsEarnedModule' },
  { path: 'get-rewards', loadChildren: './get-rewards/get-rewards.module#GetRewardsModule' },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: { showHeader: false, showSidebar: false }
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: { showHeader: false, showSidebar: false }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
