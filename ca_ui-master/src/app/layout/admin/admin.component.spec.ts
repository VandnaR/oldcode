import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AdminComponent } from './admin.component'
import { AdminModule } from './admin.module'

describe('ChartsComponent', () => {
  let component: AdminComponent
  let fixture: ComponentFixture<AdminComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AdminModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
