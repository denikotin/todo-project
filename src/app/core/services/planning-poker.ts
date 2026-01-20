import { inject, Injectable, signal } from '@angular/core';
import { PlanningPokerSession } from '../models/planning-poker';
import { TuiToastService } from '@taiga-ui/kit';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class PlanningPokerService {

    private toast = inject(TuiToastService);
    public session = signal<PlanningPokerSession | null>(null);
    public fibonacciCards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

    public createSession(taskName: string, taskDescription: string): void {
        const newSession: PlanningPokerSession = {
            taskName,
            taskDescription,
            revealed: false,
            votes: {},
            average: null,
            agreement: null
        };
        this.session.set(newSession);
    }

    public vote(userId: number, card: number): void {
        const currentSession = this.session();
        if (!currentSession) return;

        this.session.update(session => ({
            ...session!,
            votes: { ...session!.votes, [userId]: card }
        }));
    }

    public revealVotes(): void {
        const session = this.session();
        if (!session || Object.values(session.votes).some(v => v === null)) {
            this.toast.open('Все должны проголосовать!').subscribe();
            return;
        }

        const votes = Object.values(session.votes) as number[];
        const average = this.calculateAverage(votes);
        const agreement = this.calculateAgreement(votes)
        this.session.update(s => ({
            ...s!,
            revealed: true,
            average: average,
            agreement: agreement
        }));
    }


    public newTask(): void {
        this.session.set(null);
    }

    private calculateAverage(votes: number[]): number {
        const sorted = [...votes].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[middle - 1] + sorted[middle]) / 2
            : sorted[middle];
    }

    private calculateAgreement(votes: number[]) {
        const set = new Set(votes);
        const disagreement = set.size === 1 ? 0 : (set.size / votes.length) * 100;

        let agreement;
        if (disagreement === 100) {
            agreement = 100 - disagreement;
        } else if (disagreement === 0) {
            agreement = 100;
        } else {
            agreement = disagreement;
        }

        return Math.round(agreement);
    }
}