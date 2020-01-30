import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, ConfigurationRoutingModule, PageHeaderModule, FormsModule],
    declarations: [ConfigurationComponent]
})
export class ConfigurationModule {

  
}
