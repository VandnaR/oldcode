import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MigrationComponent } from './migration.component'
import { MigrationModule } from './migration.module'

describe('ChartsComponent', () => {
  let component: MigrationComponent
  let fixture: ComponentFixture<MigrationComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MigrationModule,
          RouterTestingModule,
          BrowserAnimationsModule,
        ],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
