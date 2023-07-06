import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { TAGS } from '../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private topics = new BehaviorSubject<any[]>([]);
  private selectedTopic = new BehaviorSubject<any>(null);
  constructor(private utils: Utils) { 
   
  }

  private extractTags ( topic: any )
  {
    let topicTags: any = [];
    TAGS.forEach((tag)=> {
      let matches = topic.storyDescription.match(tag.tagRegex);
      if(matches) {
        const matchess = matches.map((match:string) => {
          var matchTag = match.substring( 1, match.length - 1 );
          var storyTag = topic.storyTags?.find((m: any) => m.tagName === matchTag && m.tagCategory === tag.category);
          if (!storyTag) {
            return { tagName: matchTag, tagCategory: tag.category, tagClass: this.utils.getRandomButton() };
          }
          return null;
        }).filter((m:any) => m);
        topicTags.push(...matchess)
      }
    })
    return topicTags;
  }

  public addTopics(topic: any) : void {
    let updatedTopics : any = [...this.topics.getValue()];
    topic.storyTags = this.extractTags(topic);
    updatedTopics.push(topic);
    this.setTopics(updatedTopics);
  }

  public deleteTopics(topic: any) : void {
    this.topics.getValue().splice(this.topics.getValue().findIndex(m => m.storyTitle === topic.storyTitle),1);
  }

  public updateTopics(topic: any) : void {
  //  let topics = [...this.topics.getValue()];
  //  topics[topics.findIndex((m:any) => m.storyTitle === topic.storyTitle)] = topic;
    var t = this.topics.getValue()[this.topics.getValue().findIndex((m:any) => m.storyTitle === topic.storyTitle)];
    //console.log(t);
    t.storyTitle = topic.storyTitle;
    t.storySummary = topic.storySummary;
    t.storyDescription = topic.storyDescription;
    //console.log(t);
    this.topics.getValue()[this.topics.getValue().findIndex((m:any) => m.storyTitle === topic.storyTitle)] = t;
  //  this.setTopics(topics);
  }

  private setTopics(topics:any): void {
    this.topics.next(topics);
  }

  public getTopics(): any {
    return this.topics.asObservable();
  }

  public setSelectedTopic(topic:any) : void {
    this.selectedTopic.next(topic);
  }

  public getSelectedTopic(): any {
    return this.selectedTopic.asObservable();
  }
}
