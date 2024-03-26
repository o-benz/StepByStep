import { Component } from '@angular/core';

interface TimelineEvent {
  date: Date;
  description: string;
}

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent {
  currentDate: Date = new Date();
  events: TimelineEvent[] = [
    { date: new Date(2022, 1, 1), description: 'Arrival at the shelter' },
    { date: new Date(2022, 1, 15), description: 'First meeting with counselor' },
    { date: new Date(2022, 2, 1), description: 'Job interview' },
    { date: new Date(2024, 2, 25), description: 'Future objective: Start a new job' },
    { date: new Date(2024, 3, 1), description: 'Future objective: Move into own apartment' },
  ];
}