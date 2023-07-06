import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-attachment-modal',
  templateUrl: './attachment-modal.component.html',
  styleUrls: ['./attachment-modal.component.scss']
})
export class AttachmentModalComponent implements OnInit {
  public topic: any;

  @ViewChild('attachmentModal') 
  attachmentModal: any;

  @Input() imageUrl: any;

  constructor(private modalService: NgbModal, private utils: Utils, private storyService: StoryService) {
    console.log("Attachment modal open");
    setTimeout(()=>{this.getTopicDetails()},10);
  }

  ngOnInit (): void
  {
    
  }

  getTopicDetails(): void {
    this.storyService.getSelectedTopic().subscribe((topic:any) => {
      this.topic = topic;
      this.modalService.open( this.attachmentModal );
    });
  }
}
