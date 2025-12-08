import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoListItem } from './edit-todo-list-item';

describe('EditTodoListItem', () => {
  let component: EditTodoListItem;
  let fixture: ComponentFixture<EditTodoListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTodoListItem],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTodoListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
