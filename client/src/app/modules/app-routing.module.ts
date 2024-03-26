import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "@app/pages/about-page/about-page.component";
import { CaregiverDashboardComponent } from "@app/pages/caregiver-dashboard/caregiver-dashboard.component";
import { MainPageComponent } from "@app/pages/main-page/main-page.component";
import { ResidentPortalComponent } from "@app/pages/resident-portal/resident-portal.component";
import { ResidentDocumentsComponent } from "@app/pages/resident-documents/resident-documents.component";
import { AdminPageComponent } from "@app/pages/admin-page/admin-page.component";
import { InterventionPlanComponent } from "@app/pages/intervention-plan/intervention-plan.component";
import { ModifyResidentPageComponent } from "@app/pages/modify-resident-page/modify-resident-page.component";
import { AuthGuardService } from "@app/services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: MainPageComponent },
  { path: "about", component: AboutPageComponent },
  {
    path: "caregiver",
    component: CaregiverDashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resident",
    component: ResidentPortalComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "modify-resident/:id",
    component: ModifyResidentPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "resident-documents/:id",
    component: ResidentDocumentsComponent,
    canActivate: [AuthGuardService],
  },
  { path: "admin", component: AdminPageComponent },
  {
    path: "intervention-plan/:id",
    component: InterventionPlanComponent,
    canActivate: [AuthGuardService],
  },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
