import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AssessmentComponent } from './assessment.component'
import { AssessmentModule } from './assessment.module'

describe('ChartsComponent', () => {
  let component: AssessmentComponent
  let fixture: ComponentFixture<AssessmentComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AssessmentModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
