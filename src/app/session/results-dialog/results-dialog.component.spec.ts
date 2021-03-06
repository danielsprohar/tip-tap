import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SessionService } from '../services/session.service'

import { ResultsDialogComponent } from './results-dialog.component'

describe('ResultsDialogComponent', () => {
  let component: ResultsDialogComponent
  let fixture: ComponentFixture<ResultsDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsDialogComponent],
      providers: [
        SessionService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
