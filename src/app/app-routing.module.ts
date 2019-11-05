import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'get-started', loadChildren: './get-started/get-started.module#GetStartedModule' },
  { path: 'home', loadChildren: './home-content/home-content.module#HomeContentModule' },
  { path: 'request-pins', loadChildren: './request-pins/request-pins.module#RequestPinsModule' },
  {
    path: 'pickup',
    loadChildren: './request-pickup/request-pickup.module#RequestPickupModule'
  },
  { path: 'dashboard', loadChildren: './rewards-earned/rewards-earned.module#RewardsEarnedModule' },
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
