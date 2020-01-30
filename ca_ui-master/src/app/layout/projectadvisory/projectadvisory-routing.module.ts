import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAdvisoryComponent } from './projectadvisory.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectAdvisoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectAdvisoryRoutingModule {}
