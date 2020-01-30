import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//added

import { AssessmentRoutingModule } from './assessment-routing.module';
import { AssessmentComponent } from './assessment.component';
import { PageHeaderModule } from '../../shared';

import { SingleSelectComponent } from './answertypes/single-select/single-select.component';
import { MultiSelectComponent } from './answertypes/multi-select/multi-select.component';
import { FreeTextComponent } from './answertypes/free-text/free-text.component';
import { RadioButtonComponent } from './answertypes/radio-button/radio-button.component';
import { MultiselectCheckboxComponent } from './answertypes/multiselect-checkbox/multiselect-checkbox.component';
import { TextAreaComponent } from './answertypes/text-area/text-area.component';
import { AnsweroptionsComponent } from './answeroptions/answeroptions.component';

@NgModule({
    imports: [CommonModule, AssessmentRoutingModule, PageHeaderModule,NgbModule.forRoot(),FormsModule],
    declarations: [
            AssessmentComponent,               
            SingleSelectComponent,
            MultiSelectComponent,
            FreeTextComponent,
            RadioButtonComponent,
            MultiselectCheckboxComponent,
            TextAreaComponent,
            AnsweroptionsComponent                 
        ]        
})
export class AssessmentModule {}
