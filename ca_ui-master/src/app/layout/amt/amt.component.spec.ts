import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AMTComponent } from './amt.component'
import { AMTModule } from './amt.module'

describe('ChartsComponent', () => {
  let component: AMTComponent
  let fixture: ComponentFixture<AMTComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AMTModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AMTComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
