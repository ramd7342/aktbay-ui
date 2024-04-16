import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';
import { CreateTopicModalComponent } from '../../create-topic-modal/create-topic-modal.component';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'app-aktbay-topics-view',
  templateUrl: './aktbay-topics-view.component.html',
  styleUrls: ['./aktbay-topics-view.component.scss']
})
export class AktbayTopicsViewComponent implements OnInit, OnChanges {
  @Input() public topics: any;
  @Input() public updatedIndex: any;
  public topicSummarySearchStr : any;
  public topic: any = null;
  public selectedTopicIndex: number = -1;
  public loggedInUser: string = "";
  constructor(private modalService: NgbModal,private storyService: StoryService, private utils: Utils, private appData: AppDataService){
    this.appData.getLoggedInUser().subscribe((user: string) => {
      this.loggedInUser = user;
    });
  }

  ngOnInit (): void
  {
    this.storyService.updatedIndex.subscribe((m:any) => { 
      this.viewTopic(this.topics.find((n:any) => n.storyId === m), m);
    });  
  }

  ngOnChanges(): void {
    this.viewTopic(this.topics.find((m:any) => m.storyId === this.updatedIndex), this.updatedIndex);
  }

  public getEllipsisText(storySummary: string) {
    return this.utils.getEllipsisText(storySummary);
  }

  public viewTopic(topic:any, index: number): void {
    this.topic = topic;
    this.selectedTopicIndex = index;
  }

  public editTopic(story:any): void {
    console.log("editTopic :: ",story);
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
