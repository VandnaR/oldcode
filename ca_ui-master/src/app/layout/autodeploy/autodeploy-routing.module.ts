import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoDeployComponent } from './autodeploy.component';

const routes: Routes = [
    {
        path: '',
        component: AutoDeployComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoDeployRoutingModule {}
