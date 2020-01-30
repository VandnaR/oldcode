import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ProjectAdvisoryComponent } from './projectadvisory.component'
import { ProjectAdvisoryModule } from './projectadvisory.module'

describe('ChartsComponent', () => {
  let component: ProjectAdvisoryComponent
  let fixture: ComponentFixture<ProjectAdvisoryComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ProjectAdvisoryModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAdvisoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
