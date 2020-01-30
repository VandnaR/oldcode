import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoBuildComponent } from './autobuild.component';

const routes: Routes = [
    {
        path: '',
        component: AutoBuildComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutoBuildRoutingModule {}
