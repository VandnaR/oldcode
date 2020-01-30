import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoBuildRoutingModule } from './autobuild-routing.module';
import { AutoBuildComponent } from './autobuild.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, AutoBuildRoutingModule, PageHeaderModule],
    declarations: [AutoBuildComponent]
})
export class AutoBuildModule {}
