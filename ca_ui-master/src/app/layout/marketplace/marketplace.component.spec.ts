import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MarketplaceComponent } from './marketplace.component'
import { MarketplaceModule } from './marketplace.module'

describe('ChartsComponent', () => {
  let component: MarketplaceComponent
  let fixture: ComponentFixture<MarketplaceComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MarketplaceModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
