import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from 'src/app/services/story-service.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-attachment-modal',
  templateUrl: './attachment-modal.component.html',
  styleUrls: ['./attachment-modal.component.scss']
})
export class AttachmentModalComponent {
  public topic: any;

  @ViewChild('attachmentModal') 
  attachmentModal: any;

  constructor(private modalService: NgbModal, private utils: Utils, private storyService: StoryService) {
    console.log("Attachment modal open");
    this.storyService.getSelectedTopic().subscribe((topic:any) => {
      this.topic = topic;
      this.modalService.open( this.attachmentModal );
    });
  }
}
