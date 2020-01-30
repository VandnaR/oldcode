import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AdminhomeComponent } from './adminhome.component'
import { AdminhomeModule } from './adminhome.module'

describe('AdminhomeComponent', () => {
  let component: AdminhomeComponent
  let fixture: ComponentFixture<AdminhomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminhomeModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminhomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
