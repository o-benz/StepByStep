import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { ResidentFormBuilder } from "./resident-creation-form-builder";
import { CommunicationService } from "@app/services/communication.service";
import { UserRole } from "@common/interfaces/stakeholders/users";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-create-resident-dialog",
  templateUrl: "./create-resident-dialog.component.html",
  styleUrls: ["./create-resident-dialog.component.scss"],
})
export class CreateResidentDialogComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  constructor(
    private communicationService: CommunicationService,
    private dialogRef: MatDialogRef<CreateResidentDialogComponent>
  ) {
    this.buildForm();
  }

  async buildForm() {
    const residentFormBuilder = new ResidentFormBuilder(
      this.communicationService
    );
    this.fields = [
      {
        type: "stepper",
        fieldGroup: (await residentFormBuilder.buildForm()) as any,
      },
    ];
  }

  submit() {
    this.model.role = UserRole.Resident;
    this.model.caregivers = [];
    this.communicationService.createUser(this.model).subscribe({
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
