import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPoker } from './planning-poker';

describe('PlanningPoker', () => {
  let component: PlanningPoker;
  let fixture: ComponentFixture<PlanningPoker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningPoker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningPoker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
