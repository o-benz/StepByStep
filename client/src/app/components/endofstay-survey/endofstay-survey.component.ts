import { CommunicationService } from "@app/services/communication.service";
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-endofstay-survey',
  templateUrl: './endofstay-survey.component.html',
  styleUrls: ['./endofstay-survey.component.scss']
})

export class EndofstaySurveyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EndofstaySurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
  }

  submitSurvey() {
    this.communicationService.deleteUserById(this.data.residentId);
    this.dialogRef.close();
  }
}
