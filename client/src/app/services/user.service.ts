import { Injectable } from "@angular/core";
import { User } from "@common/interfaces/stakeholders/users";
import { CommunicationService } from "./communication.service";
import { UserRoles } from "@common/enums/user-roles.enum";

const DEFAULT_USER: User = {
  id: "0",
  firstName: "Alexia",
  lastName: "Doe",
  role: UserRoles.Caregiver,
  phoneNumber: "123456789",
  email: "alexia@gmail.com",
  hashedPassword: "password",
  residents: [],
  accessibleDocuments: [],
  manager: "0",
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  user_: User | null = null;

  constructor(private communicationService: CommunicationService) {}

  get user(): User {
    return this.user_ || DEFAULT_USER;
  }

  get username(): string {
    return this.user?.firstName || "Alex";
  }

  get isLoggedIn(): boolean {
    return !!this.user_;
  }

  setResident(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.communicationService.getUserByEmail(email).subscribe((response) => {
        if (!response.body) {
          reject("User not found");
          return;
        }
        this.user_ = response.body as User;
        resolve();
      });
    });
  }

  clearUser(): void {
    this.user_ = null;
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Trigger Warning: This atrocity is only for pitching purposes. Not to be repeated at home.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  setFakeCaregiver(email: string): void {
    let firstName = email.split("@")[0].toLowerCase();
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const uid = Math.floor(Math.random() * 1000);
    this.user_ = { firstName: firstName, lastName: "", id: uid } as any as User;
  }
}
