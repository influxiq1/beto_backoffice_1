import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsARepComponent } from './login-as-a-rep.component';

describe('LoginAsARepComponent', () => {
  let component: LoginAsARepComponent;
  let fixture: ComponentFixture<LoginAsARepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAsARepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAsARepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
