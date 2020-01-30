import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from './adminhome.component';
//import { DashboardComponent } from '../layout/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: AdminhomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminhomeRoutingModule {
}
