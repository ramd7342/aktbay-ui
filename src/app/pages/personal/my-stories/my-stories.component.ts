import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { IStory } from 'src/app/models/IStory';
import { AppDataService } from 'src/app/services/app-data.service';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent {
  public topics$: Observable<IStory[]> = new Observable<IStory[]>();
  public curPage : string = "Public";
  public updatedIndex: Observable<string> = new Observable<string>();
  public selectedView: string = "default";
  public loggedInUser: string = "";
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private utils: Utils, private storyService: StoryService, private appData: AppDataService)
  {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
      this.topics$ = this.storyService.topics.pipe(
        map((topics: any) => topics.filter((topic: any)=> topic.storyCreatedBy === user))
      );
    });
    
  }
}
