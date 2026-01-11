import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoListService } from '../../../core/services/todo-list-service';
import { TaskStatus } from '../../../core/enums/task-status';
import { Task } from '../../../core/models/task';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextarea } from '@taiga-ui/kit';
import { EnumConverterService } from '../../../core/services/filter.service';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-todo-item-view',
  imports: [FormsModule, TuiTextfield, ReactiveFormsModule, TuiTextarea, TuiButton, TuiDataListWrapper, TuiSelect, TuiChevron],
  templateUrl: './todo-item-view.html',
  styleUrl: './todo-item-view.css',
})
export class TodoItemView implements OnInit {

  private activateRoute = inject(ActivatedRoute)
  private todoService = inject(TodoListService)
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder)
  private enumConverterService = inject(EnumConverterService)
  private userService = inject(UserService)

  protected selectedTask: Task;
  protected taskForm: FormGroup;

  protected userList = signal<User[]>(null)
  protected statusList = signal(this.enumConverterService.getStatus())
  protected priorityList = signal(this.enumConverterService.getPriority())

  protected stringifyStatusOrPriority = (x) => x.value;
  protected stringifyUsers = (x: User) => x.firstname + ' ' + x.lastname;

  ngOnInit(): void {

    this.userList.set(this.userService.users())

    this.activateRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');
      this.selectedTask = this.todoService.getListItem(Number(id));
      this.updateFormValues()
    })

    this.taskForm = this.formBuilder.group({
      name: [this.selectedTask.name],
      description: [this.selectedTask.description],
      status: [this.statusList().filter(x => x.key === this.selectedTask.status)[0]],
      estimate: [this.selectedTask.estimate],
      assigneeId: [this.userList().filter( (x:User) => x.id == this.selectedTask.assigneeId)[0]],
      reporterId: [this.userList().filter( (x:User) => x.id == this.selectedTask.reporterId)[0]],
      labels: [this.selectedTask.labels],
      sprint: [this.selectedTask.sprint],
      priority: [this.priorityList().filter(x => x.key === this.selectedTask.priority)[0]],
    })

  }

  public check(): boolean {
    return this.selectedTask?.status == TaskStatus.Done ? true : false;
  }

  protected onChanged($event): void {
    if ($event.target.checked) {
      this.todoService.fullfillItem(this.selectedTask.id);
    }
  }

  private updateFormValues(): void {
    if (this.selectedTask && this.taskForm) {
      this.taskForm.patchValue({
        name: this.selectedTask.name || '',
        description: this.selectedTask.description || '',
        status: this.statusList().filter(x => x.key === this.selectedTask.status)[0] || '',
        estimate: this.selectedTask.estimate || '',
        assigneeId: this.userList().filter( (x:User) => x.id == this.selectedTask.assigneeId)[0] || '',
        reporterId: this.userList().filter( (x:User) => x.id == this.selectedTask.reporterId)[0] || '',
        labels: this.selectedTask.labels || '',
        sprint: this.selectedTask.sprint || '',
        priority: this.priorityList().filter(x => x.key === this.selectedTask.priority)[0]  || '',
      });
    }
  }

  public test() {
    console.log(this.taskForm.controls)
  }

}
