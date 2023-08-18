import { Injectable } from '@angular/core';
import { IStory } from '../models/IStory';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class AppDataService
{
  private availableUsers: Array<string> = ["ram7459", "sow2704","luck1506"]
  private loggedInUser = new BehaviorSubject<string>("");
  
  constructor() { 
    this.loggedInUser.next(this.availableUsers[0]);
  }

  public getLoggedInUser(): Observable<string> {
    return this.loggedInUser.asObservable();
  }

  public setLoggedInUser(user: string): void {
    this.loggedInUser.next(user)
  }
}
