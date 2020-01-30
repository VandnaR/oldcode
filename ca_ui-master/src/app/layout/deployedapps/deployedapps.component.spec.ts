import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DeployedAppsComponent } from './deployedapps.component'
import { DeployedAppsModule } from './deployedapps.module'

describe('ChartsComponent', () => {
  let component: DeployedAppsComponent
  let fixture: ComponentFixture<DeployedAppsComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          DeployedAppsModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployedAppsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
