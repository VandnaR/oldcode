import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, AdminRoutingModule, PageHeaderModule,ReactiveFormsModule],
    declarations: [AdminComponent]
})

export class AdminModule {}
