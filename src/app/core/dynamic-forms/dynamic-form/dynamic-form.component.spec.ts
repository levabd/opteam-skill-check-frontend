import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dynamicFormComponent } from './dynamic-form.component';

describe('dynamicFormComponent', () => {
  let component: dynamicFormComponent;
  let fixture: ComponentFixture<dynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
