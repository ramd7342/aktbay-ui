import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IStory } from 'src/app/models/IStory';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';
import { CreateTopicModalComponent } from '../../create-topic-modal/create-topic-modal.component';
import { StoryDetailsComponent } from '../../story-details/story-details.component';
import { AppDataService } from 'src/app/services/app-data.service';


@Component({
  selector: 'app-aktbay-topics',
  templateUrl: './aktbay-topics.component.html',
  styleUrls: ['./aktbay-topics.component.scss']
})
export class AktbayTopicsComponent implements OnInit, OnChanges {
  public topicSummarySearchStr : any;
  @Input() public topics: any;
  @Input() public view: any;
  @Input() public updatedIndex: any;
  public selectedTopicIndex: number = -1;
  public curView: boolean = false;
  public loggedInUser: string = "";
  constructor(private modalService: NgbModal,private storyService: StoryService, private utils: Utils, private appData: AppDataService){ 
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
    });
  }

  public ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selectedTopicIndex = -1;
  }

  public switchView() {
    this.curView = !this.curView
  }

  public getEllipsisText(storySummary: string) {
    return this.utils.getEllipsisText(storySummary);
  }

  public readStory(topic:any): void {
    const modalRef = this.modalService.open( StoryDetailsComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true})
    modalRef.componentInstance.topic = topic;
    modalRef.componentInstance.pageView = "card";
  }

  public viewTopic(story:any): void {
    this.storyService.setSelectedTopic(story);
  }

  public editTopic(story:any): void {
    const modalRef = this.modalService.open(CreateTopicModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.story = story;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
     // console.log(error);
    });
    this.storyService.setSelectedTopic(story);
  }

  public deleteTopic (topic: any ): void
  {
    this.storyService.setSelectedTopic(null);
    this.storyService.deleteTopics(topic);
  }
}