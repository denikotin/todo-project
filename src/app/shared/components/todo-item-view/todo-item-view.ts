import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskService } from '../../../core/services/task.service';
import { TaskStatus } from '../../../core/enums/task-status';
import { Task } from '../../../core/models/task';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextarea, TuiToastService } from '@taiga-ui/kit';
import { EnumConverterService } from '../../../core/services/enumConverter.service';
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
  private taskService = inject(TaskService)
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(FormBuilder)
  private enumConverterService = inject(EnumConverterService)
  private userService = inject(UserService)
  private toast = inject(TuiToastService);
  

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
      this.selectedTask = this.taskService.getTask(Number(id));
      this.updateFormValues()
    })

    this.createForm()
  }


  protected addTask(){
    if(this.taskForm.valid){
      this.taskService.addTask(this.taskForm)
      this.taskForm.reset('');
    } else{
      this.toast.open("Не все поля заполнены", { autoClose: 2000}).subscribe();
    }
  }

  protected editTask(){
    if(this.taskForm.valid){
      const task = this.taskService.getTask(this.selectedTask.id)
      task.name = this.taskForm.get('name').value;
      task.description = this.taskForm.get('description').value;
      task.status = this.taskForm.get('status').value.key;
      task.estimate = this.taskForm.get('estimate').value;
      task.assigneeId = this.taskForm.get('assigneeId').value.id;
      task.reporterId = this.taskForm.get('reporterId').value.id;
      task.labels = this.taskForm.get('labels').value;
      task.sprint = this.taskForm.get('sprint').value;
      task.priority = this.taskForm.get('priority').value.key;

      this.taskService.updateTask(this.selectedTask.id, task);
    } else{
      this.toast.open("Не все поля заполнены", { autoClose: 2000}).subscribe();
    }

  }

  private createForm() {
    this.taskForm = this.formBuilder.group({
      name: [this.selectedTask?.name, Validators.required],
      description: [this.selectedTask?.description],
      status: [this.statusList().filter(x => x.key === this.selectedTask?.status)[0], Validators.required],
      estimate: [this.selectedTask?.estimate],
      assigneeId: [this.userList().filter((x: User) => x.id == this.selectedTask?.assigneeId)[0],Validators.required],
      reporterId: [this.userList().filter((x: User) => x.id == this.selectedTask?.reporterId)[0],Validators.required],
      labels: [this.selectedTask?.labels],
      sprint: [this.selectedTask?.sprint],
      priority: [this.priorityList().filter(x => x.key === this.selectedTask?.priority)[0],Validators.required],
    })

  }

  private updateFormValues(): void {
    if (this.selectedTask && this.taskForm) {
      this.taskForm.patchValue({
        name: this.selectedTask.name || '',
        description: this.selectedTask.description || '',
        status: this.statusList().filter(x => x.key === this.selectedTask.status)[0] || '',
        estimate: this.selectedTask.estimate || '',
        assigneeId: this.userList().filter((x: User) => x.id == this.selectedTask.assigneeId)[0] || '',
        reporterId: this.userList().filter((x: User) => x.id == this.selectedTask.reporterId)[0] || '',
        labels: this.selectedTask.labels || '',
        sprint: this.selectedTask.sprint || '',
        priority: this.priorityList().filter(x => x.key === this.selectedTask.priority)[0] || '',
      });
    }
  }

}
