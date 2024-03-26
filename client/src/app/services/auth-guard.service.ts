import { Injectable } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(private userService: UserService) {}

  canActivate(): boolean {
    return this.userService.isLoggedIn;
  }
}
