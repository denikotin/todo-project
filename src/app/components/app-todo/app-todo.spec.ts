import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTodo } from './app-todo';

describe('AppTodo', () => {
  let component: AppTodo;
  let fixture: ComponentFixture<AppTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
