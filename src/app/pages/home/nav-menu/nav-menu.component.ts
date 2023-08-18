import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public loggedInUser: string = "";
  constructor(private appData: AppDataService, private router: Router) {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      console.log("user: ", user);
      this.loggedInUser = user;
    });
  }

  public redirectToMyStories(): void {
    this.router.navigate(['/my-stories']);
  }

  public redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  public changeLoginUser(user:string) {
    this.appData.setLoggedInUser(user);
 //   this.loggedInUser = user;
  }
}
