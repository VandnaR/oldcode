import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvisoryComponent } from './advisory.component';

const routes: Routes = [
    {
        path: '',
        component: AdvisoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvisoryRoutingModule {}

