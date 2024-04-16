import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Utils } from 'src/app/utils/Utils';
import { TAGS } from '../constants/constants';
import { IStory } from '../models/IStory';
import axios from 'axios';

import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  public topics = new BehaviorSubject<any[]>([]);
  public updatedIndex = new BehaviorSubject<string>("");
  private selectedTopic = new BehaviorSubject<any>(null);
  constructor(private utils: Utils, private http: HttpClient) { 
    this.getTopics();
  }

  private extractTags ( topic: any )
  {
    let topicTags: any = [];
    TAGS.forEach((tag)=> {
      let matches = topic?.content?.storyDescription.match(tag.tagRegex);
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
    this.http.post('http://localhost:3000/topics', topic).subscribe((data: any) => {
      console.log("added successfully");
      this.getTopics();
    });
    // let updatedTopics : any = [...this.topics.getValue()];
    // updatedTopics.push(topic);
    // this.setTopics(updatedTopics);
    // this.updatedIndex.next(topic.storyId);
  }

  public deleteTopics(topic: any) : void {
    this.http.delete(`http://localhost:3000/topics/${topic.storyId}`).subscribe((data: any) => {
      console.log("updated successfully");
      this.getTopics();
    });
   // this.topics.getValue().splice(this.topics.getValue().findIndex(m => m.storyId === topic.storyId),1);
  }

  public updateTopics(topic: any) : void {
    //console.log("updateTopics :: ",topic);
    this.http.put(`http://localhost:3000/topics/${topic.storyId}`, topic).subscribe((data: any) => {
      console.log("updated successfully");
      this.getTopics();
    });
    // let index = this.topics.getValue().findIndex((m:any) => m.storyId === topic.storyId);
    // this.topics.getValue()[index] = topic;
    // this.setTopics(this.topics.getValue());
    // this.updatedIndex.next(topic.storyId);
  }

  public setTopics(topics:any): void {
    this.topics.next(topics);
  }

  public getTopics(): any {
   // return this.topics.asObservable();
   const topics = this.http.get('http://localhost:3000/topics');
   topics.subscribe((data: any) => {
    this.setTopics(data);
   });
   return topics;
  }

  public setSelectedTopic(topic:any) : void {
    this.selectedTopic.next(topic);
  }

  public getSelectedTopic(): any {
    return this.selectedTopic.asObservable();
  }
}
