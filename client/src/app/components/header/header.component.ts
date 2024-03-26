import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@app/services/user.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  get username(): string {
    return this.userService.username;
  }

  isResident(): boolean {
    return this.router.url.includes("resident");
  }
}
