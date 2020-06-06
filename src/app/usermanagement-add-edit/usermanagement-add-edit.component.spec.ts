import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementAddEditComponent } from './usermanagement-add-edit.component';

describe('UsermanagementAddEditComponent', () => {
  let component: UsermanagementAddEditComponent;
  let fixture: ComponentFixture<UsermanagementAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagementAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
