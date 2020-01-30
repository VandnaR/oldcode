import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RedirectPageRoutingModule } from './redirect-page-routing.module';
import { RedirectPageComponent } from './redirect-page.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, RedirectPageRoutingModule,PageHeaderModule,FormsModule],
    declarations: [RedirectPageComponent]
})
export class RedirectPageModule {}
