import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AutoDeployComponent } from './autodeploy.component'
import { AutoDeployModule } from './autodeploy.module'

describe('ChartsComponent', () => {
  let component: AutoDeployComponent
  let fixture: ComponentFixture<AutoDeployComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AutoDeployModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDeployComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
