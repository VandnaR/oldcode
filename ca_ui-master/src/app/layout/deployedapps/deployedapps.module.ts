import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeployedAppsRoutingModule } from './deployedapps-routing.module';
import { DeployedAppsComponent } from './deployedapps.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, DeployedAppsRoutingModule, PageHeaderModule],
    declarations: [DeployedAppsComponent]
})
export class DeployedAppsModule {}
 