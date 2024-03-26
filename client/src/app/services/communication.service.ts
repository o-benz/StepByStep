import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { InterventionPlan } from "@common/interfaces/documents/intervention-plan.interface";
import {
  Caregiver,
  Resident,
  User,
} from "@common/interfaces/stakeholders/users";

@Injectable({
  providedIn: "root",
})
export class CommunicationService {
  private readonly baseUrl: string = environment.serverUrl;

  constructor(private readonly http: HttpClient) {}

  getAllResidents(): Observable<HttpResponse<Resident[]>> {
    return this.http
      .get<Resident[]>(`${this.baseUrl}/users/residents`, {
        observe: "response",
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  getAllCaregivers(): Observable<HttpResponse<Caregiver[]>> {
    return this.http
      .get<Caregiver[]>(`${this.baseUrl}/users/caregivers`, {
        observe: "response",
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  getUserById(id: string): Observable<HttpResponse<User>> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${id}`, { observe: "response" })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    return this.http
      .post<User>(`${this.baseUrl}/users`, user, { observe: "response" })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  getUserByEmail(email: string): Observable<HttpResponse<User>> {
    return this.http
      .get<User>(`${this.baseUrl}/users/email/${email}`, {
        observe: "response",
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  updateUser(id: string, user: User): Observable<HttpResponse<User>> {
    return this.http
      .patch<User>(`${this.baseUrl}/users/${id}`, user, { observe: "response" })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  deleteAllUsers(): Observable<HttpResponse<any>> {
    return this.http
      .delete(`${this.baseUrl}/users`, { observe: "response" })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  deleteUserById(id: string): Observable<HttpResponse<any>> {
    return this.http
      .delete(`${this.baseUrl}/users/${id}`, { observe: "response" })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  getPlans(): Observable<InterventionPlan[]> {
    return this.http
      .get<InterventionPlan[]>(`${this.baseUrl}/plans`, {
        observe: "response",
        responseType: "json",
      })
      .pipe(
        map((response: HttpResponse<InterventionPlan[]>) => {
          return response.body as InterventionPlan[];
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getPlan(id: string): Observable<InterventionPlan> {
    return this.http
      .get<InterventionPlan>(`${this.baseUrl}/plans/${id}`, {
        observe: "response",
        responseType: "json",
      })
      .pipe(
        map((response: HttpResponse<InterventionPlan>) => {
          return response.body as InterventionPlan;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  createPlan(plan: InterventionPlan): Observable<InterventionPlan> {
    return this.http
      .post<InterventionPlan>(`${this.baseUrl}/plans`, plan, {
        observe: "response",
        responseType: "json",
      })
      .pipe(
        map((response: HttpResponse<InterventionPlan>) => {
          return response.body as InterventionPlan;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  updatePlan(id: string, plan: InterventionPlan): Observable<InterventionPlan> {
    return this.http
      .patch<InterventionPlan>(`${this.baseUrl}/plans/${id}`, plan, {
        observe: "response",
        responseType: "json",
      })
      .pipe(
        map((response: HttpResponse<InterventionPlan>) => {
          return response.body as InterventionPlan;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  deleteAllPlans(): Observable<HttpResponse<string>> {
    return this.http
      .delete(`${this.baseUrl}/plans`, {
        observe: "response",
        responseType: "text",
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }

  deletePlan(id: string): Observable<HttpResponse<string>> {
    return this.http
      .delete(`${this.baseUrl}/plans/${id}`, {
        observe: "response",
        responseType: "text",
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      );
  }
}
