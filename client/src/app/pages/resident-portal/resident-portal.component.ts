import { Component } from "@angular/core";
import { ResidentPortalOptions } from "@app/enums/resident-portal-options.enum";
import { UserService } from "@app/services/user.service";
import { Resident } from "@common/interfaces/stakeholders/users";

@Component({
  selector: "app-resident-portal",
  templateUrl: "./resident-portal.component.html",
  styleUrls: ["./resident-portal.component.scss"],
})
export class ResidentPortalComponent {
  options: string[] = Object.keys(ResidentPortalOptions).map(
    (key) => ResidentPortalOptions[key as keyof typeof ResidentPortalOptions]
  );

  selectedOption: string = ResidentPortalOptions.PersonalInformation;

  constructor(private userService: UserService) {}

  get resident(): Resident {
    return this.userService.user as any as Resident;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
