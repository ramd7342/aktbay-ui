import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoryService } from 'src/app/services/story-service.service';

@Component({
  selector: 'app-create-image-modal',
  templateUrl: './create-image-modal.component.html',
  styleUrls: ['./create-image-modal.component.scss']
})
export class CreateImageModalComponent implements OnInit {
  @Input() selectedText: any;

  @Input() story: any;

  public imgTitle: string = "";
  public imgDescription: string = "";
  public imageRating: number = 0;
  public imageAudio: Array<any> = [];

  public uploadedImage : any = {};

  constructor(public activeModal: NgbActiveModal, private storyService: StoryService) {}

  closeModal(): void {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit(): void {
    this.imgDescription = this.selectedText;
  }

  public addImage(): any {
    this.story.storyImageUrl.push({imgTitle:this.imgTitle, imgDescription: this.imgDescription, imgRating: this.imageRating, imgAudio: this.imageAudio, imgSrc: this.uploadedImage.url});
    this.storyService.updateTopics(this.story);
    this.closeModal();
    this.imgTitle = "";
    this.imgDescription = "";
    this.imageRating = 0;
    this.imageAudio = [];
    this.uploadedImage = null;
  }

  handleFileInput(event: any) {
    const fileToUpload = event.target?.files.item(0);
  
      let reader = new FileReader();
      reader.onload = (event: any) => {
        //this.imageUrl.push({name:fileToUpload.name, url: event.target.result});
        this.uploadedImage = {name:fileToUpload.name, url: event.target.result};
      }
     reader.readAsDataURL(fileToUpload);
    }
}
