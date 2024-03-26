import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { ChatComponent } from "@app/components/chat/chat.component";
import { CaregiverDashboardOptions } from "@app/enums/caregiver-dashboard-options.enum";
import { Resident } from "@common/interfaces/stakeholders/users";

@Component({
  selector: "app-caregiver-dashboard",
  templateUrl: "./caregiver-dashboard.component.html",
  styleUrls: ["./caregiver-dashboard.component.scss"],
})
export class CaregiverDashboardComponent implements OnInit, OnDestroy {
  caregiver: String;
  options: string[] = Object.keys(CaregiverDashboardOptions).map(
    (key) =>
      CaregiverDashboardOptions[key as keyof typeof CaregiverDashboardOptions]
  );
  selectedOption: string = CaregiverDashboardOptions.Residents;
  selectedResident: Resident | null = null;

  @ViewChild(ChatComponent) chatComponent: ChatComponent;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  onOpenChat(resident: any) {
    this.selectedResident = resident;
    this.changeDetectorRef.detectChanges();
    this.chatComponent?.refreshChat();
  }

  closeChat() {
    this.selectedResident = null;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  ngOnInit(): void {
    this.caregiver = "John Doe";
  }

  ngOnDestroy(): void {}
}
