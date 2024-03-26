import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommunicationService } from "@app/services/communication.service";
import { Resident } from "@common/interfaces/stakeholders/users";

@Component({
  selector: "app-resident-documents",
  templateUrl: "./resident-documents.component.html",
  styleUrls: ["./resident-documents.component.scss"],
})
export class ResidentDocumentsComponent implements OnInit {
  residentId: string;
  resident: Resident;
  documents: string[] = [];
  constructor(
    private communicationService: CommunicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.residentId = this.route.snapshot.paramMap.get("id") || "";
    this.communicationService
      .getUserById(this.residentId)
      .subscribe((response) => {
        if (response.body && response.body.role == "resident") {
          this.resident = response.body;
        }
      });
    this.documents = this.resident.accessibleDocuments;
  }

  openDocument(document: string) {
    console.log("Opened DOC!");
  }
}
