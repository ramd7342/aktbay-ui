import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-aktbay-topics',
  templateUrl: './aktbay-topics.component.html',
  styleUrls: ['./aktbay-topics.component.scss']
})
export class AktbayTopicsComponent {
  public topicSummarySearchStr : any;
  public topics$: Observable<any[]> = new Observable<any>();

  
  constructor(private storyService: StoryService, private utils: Utils){
    this.topics$ = this.storyService.getTopics();
  }

  public getEllipsisText(storySummary: string) {
    return this.utils.getEllipsisText(storySummary);
  }

  public viewTopic(topic:any): void {
    console.log("viewTopic : ", topic);
    this.storyService.setSelectedTopic(topic);
  }

  public editTopic(topic:any): void {
    this.storyService.setSelectedTopic(topic);
  }

  public deleteTopic (topic: any ): void
  {
    this.storyService.setSelectedTopic(null);
    this.storyService.deleteTopics(topic);
  }
}
