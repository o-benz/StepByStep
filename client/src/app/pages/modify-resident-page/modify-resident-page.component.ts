import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommunicationService } from "@app/services/communication.service";
import { Resident, UserRole } from "@common/interfaces/stakeholders/users";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { ResidentFormBuilder } from "@app/components/create-resident-dialog/resident-creation-form-builder";

@Component({
  selector: "app-modify-resident-page",
  templateUrl: "./modify-resident-page.component.html",
  styleUrls: ["./modify-resident-page.component.scss"],
})
export class ModifyResidentPageComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  residentId: string;
  resident: Resident;
  constructor(
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.residentId = this.route.snapshot.paramMap.get("id") || "";
    this.communicationService
      .getUserById(this.residentId)
      .subscribe(async (response) => {
        if (response.body && response.body.role == "resident") {
          this.resident = response.body;

          const residentFormBuilder = new ResidentFormBuilder(
            this.communicationService
          );
          this.fields = [
            {
              type: "stepper",
              fieldGroup: await residentFormBuilder.buildForm(),
            },
          ];
          this.model = { ...this.resident };
        }
      });
  }

  submit() {
    this.model.role = UserRole.Resident;

    this.communicationService
      .updateUser(this.residentId, this.model)
      .subscribe({
        next: (response) => {
          this.router.navigate(["/caregiver"]);
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.router.navigate(["/caregiver"]);
  }

  cancel() {
    this.router.navigate(["/caregiver"]);
  }
}
