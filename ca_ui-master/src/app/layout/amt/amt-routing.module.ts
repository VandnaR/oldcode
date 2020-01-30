import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AMTComponent } from './amt.component';

const routes: Routes = [
    {
        path: '',
        component: AMTComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AMTRoutingModule {}
