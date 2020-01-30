import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminhomeRoutingModule } from './adminhome-routing.module';
import { AdminhomeComponent } from './adminhome.component';
import { DashboardModule } from '../layout/dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    AdminhomeRoutingModule,
    DashboardModule
  ],
  declarations: [AdminhomeComponent]
})
export class AdminhomeModule { }
