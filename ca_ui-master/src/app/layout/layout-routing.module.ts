import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'redirect-page', pathMatch: 'prefix' },           
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },            
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
            { path: 'migration', loadChildren: './migration/migration.module#MigrationModule' },
            { path: 'assessment', loadChildren: './assessment/assessment.module#AssessmentModule' },
            { path: 'amt', loadChildren: './amt/amt.module#AMTModule'},
            { path: 'advisory', loadChildren: './advisory/advisory.module#AdvisoryModule' },
            { path: 'projectadvisory', loadChildren: './projectadvisory/projectadvisory.module#ProjectAdvisoryModule' },
            { path: 'configuration', loadChildren: './configuration/configuration.module#ConfigurationModule' },
            { path: 'autobuild', loadChildren: './autobuild/autobuild.module#AutoBuildModule' },
            { path: 'autodeploy', loadChildren: './autodeploy/autodeploy.module#AutoDeployModule' },
            { path: 'deployedapps', loadChildren: './deployedapps/deployedapps.module#DeployedAppsModule' },
            { path: 'marketplace', loadChildren: './marketplace/marketplace.module#MarketplaceModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'redirect-page', loadChildren: './redirect-page/redirect-page.module#RedirectPageModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
