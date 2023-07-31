import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { TAGS } from '../constants/constants';
import { IStory } from '../models/IStory';
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private topics = new BehaviorSubject<any[]>([]);
  public updatedIndex = new BehaviorSubject<string>("");
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

  public addTopics(topic: IStory) : void {
    let updatedTopics : any = [...this.topics.getValue()];
    updatedTopics.push(topic);
    this.setTopics(updatedTopics);
    this.updatedIndex.next(topic.storyId);
  }

  public deleteTopics(topic: any) : void {
    this.topics.getValue().splice(this.topics.getValue().findIndex(m => m.storyId === topic.storyId),1);
  }

  public updateTopics(topic: any) : void {
    let index = this.topics.getValue().findIndex((m:any) => m.storyId === topic.storyId);
    this.topics.getValue()[index] = topic;
    this.updatedIndex.next(topic.storyId);
  }

  public setTopics(topics:any): void {
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
