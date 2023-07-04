import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TAGS } from 'src/app/constants/constants';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-create-tag-modal',
  templateUrl: './create-tag-modal.component.html',
  styleUrls: ['./create-tag-modal.component.scss']
})
export class CreateTagModalComponent {
  public formTagName: string = "";
  public formTagCategory: string = "";
  public tags = TAGS;

  public topics: any;

  public topic: any;

  @ViewChild('demoModal') 
  demoModal: any;

  public topics$: Observable<any[]> = new Observable<any>();

  constructor(private modalService: NgbModal, private utils: Utils, private storyService: StoryService) {
    this.formTagCategory = this.tags[0].category;
    this.open(this.demoModal, null);
    this.topics$.subscribe(data => {
      this.topics = data;
    })

    this.storyService.getSelectedTopic().subscribe((topic:any) => {
      this.topic = topic;
    });
  }

  public open ( modal: any, tag: any ): void
  {
    if(tag) {
      this.formTagName = tag.tagName;
      this.formTagCategory = tag.tagCategory;
    }
    const modalRef = this.modalService.open( modal );
    modalRef.componentInstance.tag = tag;
  }

  public getFormTag(category: any) {
    return this.tags.find(f => f.category===category)?.displayName || this.tags[0].displayName;
  }

  public saveTagtoTopic(): void {
    let story = this.topics[this.topics.findIndex((m:any) => m.storyTitle === this.topic.storyTitle)];
    if(story.storyTags.findIndex((m:any) => m.tagName === this.formTagName) < 0) {
      story.storyTags.push({ tagName: this.formTagName, tagCategory: this.formTagCategory, tagClass: this.utils.getRandomButton() });
    } else {
      alert("Tag created already");
    }
  }
}
