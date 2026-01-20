import { Component, computed, inject, signal } from '@angular/core';
import { PlanningPokerService } from '../../core/services/planning-poker';
import { TuiProgress, TuiTextarea } from '@taiga-ui/kit';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-planning-poker',
  imports: [CommonModule, TuiTextarea, FormsModule, TuiTextfield, TuiButton, TuiIcon, TuiProgress],
  templateUrl: './planning-poker.html',
  styleUrl: './planning-poker.css'
})
export class PlanningPoker {

  private pokerService = inject(PlanningPokerService);
  private userService = inject(UserService)
  private authService = inject(AuthService)


  protected newTaskName = '';
  protected newTaskDescription = '';
  protected myVote: number | null = null;

  protected session = computed(() => this.pokerService.session())
  protected fibonacciCards = signal<number[]>(this.pokerService.fibonacciCards)
  protected users = signal<User[]>(this.userService.users().filter(x => x.id !== this.authService.user().id))
  protected currentUser = signal<User>(this.authService.user())


  protected createNewTask(): void {
    if (this.newTaskName.trim()) {
      this.pokerService.createSession(this.newTaskName, this.newTaskDescription);
      this.newTaskName = '';
      this.newTaskDescription = '';
      this.myVote = null;
    }
  }

  protected vote(card: number): void {
    this.pokerService.vote(this.currentUser().id, card);
    this.users().forEach(user => {
      this.pokerService.vote(user.id, this.getRandomCard())
    })
    this.myVote = card;



  }

  protected revealVotes(): void {
    this.pokerService.revealVotes();
    
  }

  protected startNewTask(): void {
    this.pokerService.newTask();
    this.myVote = null;
  }

  private getRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.fibonacciCards().length);
    return this.fibonacciCards()[randomIndex];
  }
}

