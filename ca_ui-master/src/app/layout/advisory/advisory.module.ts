import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AdvisoryRoutingModule } from './advisory-routing.module';
import { AdvisoryComponent } from './advisory.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, AdvisoryRoutingModule, PageHeaderModule,Ng2Charts],
    declarations: [AdvisoryComponent]
})

export class AdvisoryModule {}
