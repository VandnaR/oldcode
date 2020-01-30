import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MigrationRoutingModule } from './migration-routing.module';
import { MigrationComponent } from './migration.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, MigrationRoutingModule, PageHeaderModule],
    declarations: [MigrationComponent]
})

export class MigrationModule {}
