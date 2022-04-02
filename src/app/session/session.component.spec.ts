import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Params } from '@angular/router'
import { ActivatedRouteStub } from 'src/testing/activated-route-stub'
import { Finger, Hand, Lesson } from '../lessons/models/lesson'
import { SessionComponent } from './session.component'

describe('SessionComponent', () => {
  let component: SessionComponent
  let fixture: ComponentFixture<SessionComponent>
  let routeStub = new ActivatedRouteStub()
  let mockLesson: Lesson

  beforeEach(async () => {
    mockLesson = new Lesson({
      level: 'beginner',
      hand: 'left',
      finger: 'pinky',
    })

    await TestBed.configureTestingModule({
      declarations: [SessionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the mock lesson', (done: DoneFn) => {
    routeStub.setQueryParamMap(mockLesson.toParams())

    component.lesson$?.subscribe((lesson: Lesson) => {
      expect(lesson).toEqual(mockLesson)
      expect(lesson.toParams()).toEqual(mockLesson.toParams())
      done()
    })
  })
})
