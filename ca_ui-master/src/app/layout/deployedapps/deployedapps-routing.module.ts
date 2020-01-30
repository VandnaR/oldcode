import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeployedAppsComponent } from './deployedapps.component';

const routes: Routes = [
    {
        path: '',
        component: DeployedAppsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeployedAppsRoutingModule {}
