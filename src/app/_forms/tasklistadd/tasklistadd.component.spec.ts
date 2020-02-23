import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistaddComponent } from './tasklistadd.component';

describe('TasklistaddComponent', () => {
  let component: TasklistaddComponent;
  let fixture: ComponentFixture<TasklistaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasklistaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
