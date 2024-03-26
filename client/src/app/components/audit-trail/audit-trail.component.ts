import { Component } from '@angular/core';

interface AuditEvent {
  timestamp: Date;
  message: string;
}

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent {
  currentDate: Date = new Date();

  events: AuditEvent[] = [
    { timestamp: new Date(2024, 1, 12, 23, 59, 59), message: 'New resident Alice created by Eleanor' },
    { timestamp: new Date(2024, 1, 13, 15, 32, 11), message: 'New intervention plan created by Frank' },
    { timestamp: new Date(2024, 1, 14, 17, 42, 17), message: 'Clara filled a satisfaction survey' },
    { timestamp: new Date(2024, 1, 15, 19, 12, 12), message: 'New resident Joe created by Eleanor' },
    { timestamp: new Date(2024, 1, 17, 11, 13, 14), message: 'New resident Yousef created by Eleanor' },
    { timestamp: new Date(2024, 1, 18, 9, 30, 0), message: 'Maintenance check conducted by Maintenance Team' },
    { timestamp: new Date(2024, 1, 20, 14, 20, 0), message: 'Training session conducted for staff' },
    { timestamp: new Date(2024, 1, 22, 16, 45, 0), message: 'New equipment installed in the facility' },
    { timestamp: new Date(2024, 1, 25, 12, 0, 0), message: 'Resident activity day organized' },
    { timestamp: new Date(2024, 1, 28, 10, 0, 0), message: 'Monthly meeting held for staff' },
    { timestamp: new Date(2024, 0, 1, 8, 0, 0), message: 'Yearly facility inspection conducted' },
    { timestamp: new Date(2023, 11, 15, 14, 0, 0), message: 'Holiday celebration event held for residents' },
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
