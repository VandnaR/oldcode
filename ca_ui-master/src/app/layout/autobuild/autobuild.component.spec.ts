import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AutoBuildComponent } from './autobuild.component'
import { AutoBuildModule } from './autobuild.module'

describe('ChartsComponent', () => {
  let component: AutoBuildComponent
  let fixture: ComponentFixture<AutoBuildComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AutoBuildModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoBuildComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
