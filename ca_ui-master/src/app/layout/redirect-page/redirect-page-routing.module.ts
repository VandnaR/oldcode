import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectPageComponent } from './redirect-page.component';

const routes: Routes = [
    {
        path: '',component: RedirectPageComponent        
    }
   // { path: 'adminhome', loadChildren: './adminhome/adminhome.module#AdminhomeModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RedirectPageRoutingModule {}
