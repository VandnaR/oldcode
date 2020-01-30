import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AdvisoryComponent } from './advisory.component'
import { AdvisoryModule } from './advisory.module'

describe('ChartsComponent', () => {
  let component: AdvisoryComponent
  let fixture: ComponentFixture<AdvisoryComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AdvisoryModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
