import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoDeployRoutingModule } from './autodeploy-routing.module';
import { AutoDeployComponent } from './autodeploy.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, AutoDeployRoutingModule, PageHeaderModule, FormsModule],
    declarations: [AutoDeployComponent]
})
export class AutoDeployModule {}
