import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeContentRoutingModule } from './home-content-routing.module';
import { HomeContentComponent } from './home-content.component';

@NgModule({
  imports: [
    CommonModule,
    HomeContentRoutingModule
  ],
  declarations: [HomeContentComponent]
})
export class HomeContentModule { }
