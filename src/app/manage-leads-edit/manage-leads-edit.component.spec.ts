import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeadsEditComponent } from './manage-leads-edit.component';

describe('ManageLeadsEditComponent', () => {
  let component: ManageLeadsEditComponent;
  let fixture: ComponentFixture<ManageLeadsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLeadsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLeadsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
