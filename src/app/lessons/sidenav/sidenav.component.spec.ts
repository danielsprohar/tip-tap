import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BookService } from 'src/app/services/book.service'

import { SidenavComponent } from './sidenav.component'

describe('SidenavComponent', () => {
  let component: SidenavComponent
  let fixture: ComponentFixture<SidenavComponent>
  let bookServiceSpy: jasmine.SpyObj<BookService>

  beforeEach(async () => {
    bookServiceSpy = jasmine.createSpyObj('BookService', [''])

    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      providers: [{ provide: BookService, useValue: bookServiceSpy }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
