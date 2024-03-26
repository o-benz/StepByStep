/* eslint-disable import/no-unresolved */
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommunicationService } from "@app/services/communication.service";
import { Resident } from "@common/interfaces/stakeholders/users";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { CreateResidentDialogComponent } from "../create-resident-dialog/create-resident-dialog.component";
import { EndofstaySurveyComponent } from "@app/components/endofstay-survey/endofstay-survey.component";

@Component({
  selector: "app-residents",
  templateUrl: "./residents.component.html",
  styleUrls: ["./residents.component.scss"],
})
export class ResidentsComponent implements OnInit {
  @Output() openChatRequest = new EventEmitter<any>();
  residents: Resident[] = [];

  constructor(
    private communicationService: CommunicationService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchResidents();
  }

  fetchResidents() {
    this.communicationService.getAllResidents().subscribe((response) => {
      if (!response.body) return;
      this.residents = response.body;
    });
  }

  openChat(resident: any) {
    this.openChatRequest.emit(resident);
  }

  modifyInfo(resident: any) {
    this.router.navigate(["/modify-resident", resident.id]);
  }

  managePlans(residentId: string) {
    this.router.navigate(["/intervention-plan", residentId]);
  }

  viewDocuments(residentId: string) {
    this.router.navigate(["/resident-documents", residentId]);
  }

  getAgeFromBirthDate(birthDate: Date) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  createNewResident() {
    this.matDialog
      .open(CreateResidentDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.fetchResidents();
      });
  }

  endOfStay(residentId: string) {
    this.matDialog
      .open(EndofstaySurveyComponent, {
        data: { residentId: residentId },
      })
      .afterClosed()
      .subscribe(() => {
        this.fetchResidents();
      });
  }
}
