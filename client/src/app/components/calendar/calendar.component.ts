import { Component, OnInit } from '@angular/core';
import { CalendarService } from '@app/services/calendar.service';
import { Router } from '@angular/router';
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
}

interface Day {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  days: Day[] = [];
  showAddEventForm = false;

  newEvent: CalendarEvent = {
    id: '',
    title: '',
    date: new Date(),
  };

  constructor(private calendarService: CalendarService,  private router: Router) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) {
      this.days.push({ date: new Date(firstDay.getFullYear(), firstDay.getMonth(), -i), dayOfMonth: -1, isCurrentMonth: false, isToday: false, events: [] });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i);
      const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
      this.days.push({ date: date, dayOfMonth: i, isCurrentMonth: true, isToday: isToday, events: [] });
    }

    while (this.days.length % 7 !== 0) {
      const lastDate = this.days[this.days.length - 1].date;
      this.days.push({ date: new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1), dayOfMonth: -1, isCurrentMonth: false, isToday: false, events: [] });
    }

    this.assignEventsToDays();
  }

  assignEventsToDays(): void {
    this.days.forEach((day:Day) => {
      const eventsToday = this.calendarService.events.filter((event:CalendarEvent) =>
        event.date.getFullYear() === day.date.getFullYear() &&
        event.date.getMonth() === day.date.getMonth() &&
        event.date.getDate() === day.date.getDate());
      day.events = eventsToday;
    });
  }

  navigate(monthOffset: number): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + monthOffset, 1);
    this.generateCalendar();
  }

  addEvent(): void {
    if (!this.newEvent.title || !this.newEvent.date) {
      alert('Title and date are required.');
      return;
    }
    let eventDate = new Date(this.newEvent.date);
    eventDate = new Date(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
  
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substring(2, 9),
      title: this.newEvent.title,
      date: eventDate,
    };
  
    this.calendarService.events.push(newEvent);
    this.newEvent = { id: '', title: '', date: new Date(),};
    this.generateCalendar();
  }

  toggleAddEventForm() {
    this.showAddEventForm = !this.showAddEventForm;
  }
 
  isResident(): boolean {
    return this.router.url.includes('resident');
  }
}
