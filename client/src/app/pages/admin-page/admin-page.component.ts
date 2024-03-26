import { Component } from '@angular/core';
import { CommunicationService } from '@app/services/communication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  resultMessage: string;

  constructor(
    private communicationService: CommunicationService,
  ) {}

  deleteAllPlans(): void {
    this.communicationService.deleteAllPlans().subscribe(
      () => {
        this.resultMessage = 'All plans deleted';
      },
      (error) => {
        this.resultMessage = error;
      }
    );
  }

  deleteAllUsers(): void {
    this.communicationService.deleteAllUsers().subscribe(
      () => {
        this.resultMessage = 'All users deleted';
      },
      (error) => {
        this.resultMessage = error;
      }
    );
  }
}
