import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from '@app/services/communication.service';
import { UserRole } from '@common/interfaces/stakeholders/users';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-create-plan-dialog',
  templateUrl: './create-plan-dialog.component.html',
  styleUrls: ['./create-plan-dialog.component.scss']
})
export class CreatePlanDialogComponent {
  constructor(private communicationService: CommunicationService, private dialogRef: MatDialogRef<CreatePlanDialogComponent>) 
  {}
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  submit() {
    this.model.role = UserRole.Resident;
    this.communicationService.createPlan(this.model).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.dialogRef.close();
  }
}
