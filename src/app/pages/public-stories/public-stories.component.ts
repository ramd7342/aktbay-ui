import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IStory } from 'src/app/models/IStory';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-public-stories',
  templateUrl: './public-stories.component.html',
  styleUrls: ['./public-stories.component.scss']
})
export class PublicStoriesComponent {
  @Input() public topics: any;
  public loggedInUser:string = "";
  constructor(private appData: AppDataService) {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
    });
  }
}
