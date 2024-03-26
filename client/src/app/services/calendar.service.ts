import { Injectable } from '@angular/core';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  events: CalendarEvent[] = [
    { id: '1', title: '[Zoom] Meeting with Omar', date: new Date(2024, 2, 12) },
    { id: '2', title: '[Zoom] Meeting with Ghali', date: new Date(2024, 2, 26)},
    { id: '3', title: '[Zoom] Meeting with Bob', date: new Date(2024, 2, 17) },
  ];
  constructor() { }
}

