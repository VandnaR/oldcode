import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//added
import { AMTRoutingModule } from './amt-routing.module';
import { AMTComponent } from './amt.component';
import { PageHeaderModule } from '../../shared';


@NgModule({
    imports: [CommonModule,ReactiveFormsModule, AMTRoutingModule, PageHeaderModule,NgbModule.forRoot(),FormsModule],
    declarations: [
           AMTComponent                     
        ]        
})
export class AMTModule {}
