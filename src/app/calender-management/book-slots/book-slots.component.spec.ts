import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSlotsComponent } from './book-slots.component';

describe('BookSlotsComponent', () => {
  let component: BookSlotsComponent;
  let fixture: ComponentFixture<BookSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
