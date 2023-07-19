import { Component } from '@angular/core';
import { CreateTopicModalComponent } from '../../create-topic-modal/create-topic-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/utils/Utils';
import { StoryService } from 'src/app/services/story-service.service';

@Component({
  selector: 'app-aktbay-search',
  templateUrl: './aktbay-search.component.html',
  styleUrls: ['./aktbay-search.component.scss']
})
export class AktbaySearchComponent {
  constructor(private modalService: NgbModal,private utils: Utils, private storyService: StoryService)
  {
  }
  public newTopic(): void {
    const modalRef = this.modalService.open(CreateTopicModalComponent, {backdrop: 'static',size: 'lg', windowClass : "myCustomModalClass", centered: true});
    modalRef.componentInstance.story = null;
    modalRef.result.then((result) => {
      //console.log(result);
    }).catch((error) => {
      //console.log(error);
    });
  }
}
