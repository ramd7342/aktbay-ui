import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IStory } from 'src/app/models/IStory';
import { AppDataService } from 'src/app/services/app-data.service';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';
import { CreateTopicModalComponent } from '../create-topic-modal/create-topic-modal.component';

@Component({
  selector: 'app-public-stories',
  templateUrl: './public-stories.component.html',
  styleUrls: ['./public-stories.component.scss']
})
export class PublicStoriesComponent {
  @Input() public topics: any;
  public loggedInUser:string = "";
  constructor(private modalService: NgbModal,private storyService: StoryService, private utils: Utils, private appData: AppDataService) {
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
    });
  }

  public editTopic(story:any): void {
    console.log("mystories : editTopic :: ",story);
    const modalRef = this.modalService.open(CreateTopicModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.story = story;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
     // console.log(error);
    });
    this.storyService.setSelectedTopic(story);
  }
}
