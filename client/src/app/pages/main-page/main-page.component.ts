import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "@app/services/user.service";

const REALLY_SECRET_PASSWORD = "password";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnDestroy {
  selectedOption: string = "caregiver";
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  private loginSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.clearUser();
  }

  onLogin() {
    switch (this.selectedOption) {
      case "caregiver":
        this.logInCaregiver();
        break;
      case "resident":
        this.logInResident();
        break;
    }
  }

  logInCaregiver() {
    if (!this.isValidCredentials(this.email, this.password)) {
      this.displayErrorMessage();
      return;
    }
    this.userService.setFakeCaregiver(this.email);
    this.router.navigate(["/caregiver"]);
  }

  async logInResident() {
    try {
      await this.userService.setResident(this.email);
      this.router.navigate(["/resident"]);
    } catch (error) {
      this.displayErrorMessage();
    }
  }

  displayErrorMessage(): void {
    this.errorMessage = "The credentials you entered are incorrect.";
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }

  isValidCredentials(email: string, password: string): boolean {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password === REALLY_SECRET_PASSWORD;
    return isValidEmail && isValidPassword;
  }
}
