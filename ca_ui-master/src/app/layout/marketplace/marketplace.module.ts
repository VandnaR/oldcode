import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe }  from './searchPipe';

@NgModule({
    imports: [CommonModule, MarketplaceRoutingModule, PageHeaderModule, FormsModule],
    declarations: [MarketplaceComponent,SearchPipe]
})
export class MarketplaceModule {}
