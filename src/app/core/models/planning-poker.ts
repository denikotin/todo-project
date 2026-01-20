export interface PlanningPokerSession {
  taskName: string;
  taskDescription: string;
  revealed: boolean;     
  votes: { [userId: number]: number | null };  
  average: number | null;
  agreement: number | null;
}

