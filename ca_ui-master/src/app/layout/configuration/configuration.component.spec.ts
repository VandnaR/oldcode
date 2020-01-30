import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ConfigurationComponent } from './configuration.component'
import { ConfigurationModule } from './configuration.module'

describe('ChartsComponent', () => {
  let component: ConfigurationComponent
  let fixture: ComponentFixture<ConfigurationComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ConfigurationModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
