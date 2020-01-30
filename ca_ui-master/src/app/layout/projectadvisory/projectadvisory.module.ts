import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ProjectAdvisoryRoutingModule } from './projectadvisory-routing.module';
import { ProjectAdvisoryComponent } from './projectadvisory.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts,ProjectAdvisoryRoutingModule, PageHeaderModule],
    declarations: [ProjectAdvisoryComponent]
})
export class ProjectAdvisoryModule {}
