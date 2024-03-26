import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '@app/services/communication.service';
import { InterventionPlan } from '@common/interfaces/documents/intervention-plan.interface';
import { Resident } from '@common/interfaces/stakeholders/users';

@Component({
  selector: 'app-intervention-plan',
  templateUrl: './intervention-plan.component.html',
  styleUrls: ['./intervention-plan.component.scss']
})
export class InterventionPlanComponent {

deletePlan(plan: InterventionPlan) {
throw new Error('Method not implemented.');
}

modifyPlan(plan: InterventionPlan) {
throw new Error('Method not implemented.');
}
  resident: Resident;
  residentId: string;
  plan: InterventionPlan;

  constructor(private communicationService: CommunicationService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.residentId = this.route.snapshot.paramMap.get('id') || '';
    this.communicationService.getPlans().subscribe((response) => {
      response.forEach((plan) => {
        if (plan.resident == this.residentId) {
          this.plan = plan;
        }
      });
    });
    this.communicationService.getUserById(this.residentId).subscribe((response) => {
      if (response.body && response.body.role=='resident') {
        this.resident = response.body;
      }
    });
  }
}
